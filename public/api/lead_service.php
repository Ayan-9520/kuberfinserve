<?php

declare(strict_types=1);

require_once __DIR__ . '/mailer.php';
require_once __DIR__ . '/kuberone_bridge.php';

/** Default dedup window for same phone + loan type (hours). */
const API_LEAD_DEDUP_HOURS = 24;

function api_lead_parse_fields(array $data): array
{
    $fields = isset($data['fields']) && is_array($data['fields']) ? $data['fields'] : $data;

    $formType = api_str($data['form_type'] ?? $data['formType'] ?? 'Lead', 80) ?? 'Lead';
    $source = api_str($data['source'] ?? null, 120);
    $crmChannel = api_str(
        $data['crm_channel'] ?? $fields['crm_channel'] ?? $data['channel'] ?? null,
        40,
    ) ?? 'website';

    $fullName = api_str(
        $fields['full_name'] ?? $fields['fullName'] ?? $fields['name'] ?? null,
        150,
    );
    $phone = api_normalize_phone(api_str($fields['phone'] ?? null, 20));
    $email = strtolower(api_str($fields['email'] ?? null, 150) ?? '');

    $knownKeys = [
        'form_type', 'formType', 'source', 'fields', '_gotcha', 'website',
        'full_name', 'fullName', 'name', 'phone', 'email', 'city', 'age',
        'employment_type', 'employmentType', 'company_name', 'companyName',
        'monthly_income', 'monthlyIncome', 'work_experience', 'workExperience',
        'loan_type', 'loanType', 'loan_amount', 'loanAmount', 'tenure_months', 'tenureMonths',
        'existing_emi', 'existingEmi', 'purpose', 'pan', 'message', 'page_url', 'pageUrl',
        'lead_id', 'external_lead_id', 'form_variant', 'crm_channel', 'property_value',
        'partner_id', 'idempotency_key', 'channel',
    ];

    $extra = [];
    foreach ($fields as $key => $value) {
        if (in_array($key, $knownKeys, true)) {
            continue;
        }
        if ($value === null || $value === '' || $key === 'agreeTerms') {
            continue;
        }
        $extra[$key] = is_scalar($value) ? (string) $value : json_encode($value);
    }

    $partnerId = api_str(
        $fields['partner_id'] ?? $fields['partnerId'] ?? $data['partner_id'] ?? null,
        20,
    );
    if ($partnerId !== null) {
        $partnerId = strtoupper($partnerId);
    }

    return [
        'form_type' => $formType,
        'source' => $source,
        'crm_channel' => $crmChannel,
        'partner_id' => $partnerId,
        'external_lead_id' => api_str(
            $fields['external_lead_id'] ?? $fields['lead_id'] ?? $data['external_lead_id'] ?? null,
            32,
        ),
        'form_variant' => api_str($fields['form_variant'] ?? $data['form_variant'] ?? null, 80),
        'idempotency_key' => api_str(
            $data['idempotency_key'] ?? $fields['idempotency_key'] ?? null,
            64,
        ),
        'full_name' => $fullName,
        'phone' => $phone,
        'email' => $email,
        'city' => api_str($fields['city'] ?? null, 100),
        'age' => api_str($fields['age'] ?? null, 20),
        'employment_type' => api_str($fields['employment_type'] ?? $fields['employmentType'] ?? null, 80),
        'company_name' => api_str($fields['company_name'] ?? $fields['companyName'] ?? null, 150),
        'monthly_income' => api_str($fields['monthly_income'] ?? $fields['monthlyIncome'] ?? null, 80),
        'work_experience' => api_str($fields['work_experience'] ?? $fields['workExperience'] ?? null, 80),
        'loan_type' => api_str($fields['loan_type'] ?? $fields['loanType'] ?? null, 120),
        'loan_amount' => api_str($fields['loan_amount'] ?? $fields['loanAmount'] ?? null, 50),
        'tenure_months' => api_str($fields['tenure_months'] ?? $fields['tenureMonths'] ?? null, 30),
        'existing_emi' => api_str($fields['existing_emi'] ?? $fields['existingEmi'] ?? null, 50),
        'purpose' => api_str($fields['purpose'] ?? null, 120),
        'pan' => api_str($fields['pan'] ?? null, 20),
        'property_value' => api_str($fields['property_value'] ?? $fields['propertyValue'] ?? null, 50),
        'message' => api_str($fields['message'] ?? null, 5000),
        'page_url' => api_str($data['page_url'] ?? $fields['page_url'] ?? $fields['pageUrl'] ?? null, 500),
        'extra_data' => $extra === [] ? null : json_encode($extra, JSON_UNESCAPED_UNICODE),
        'ip_address' => api_client_ip(),
        'user_agent' => api_str($_SERVER['HTTP_USER_AGENT'] ?? null, 255),
    ];
}

function api_lead_validate_required(array $lead): ?string
{
    if (!$lead['phone']) {
        return 'Valid 10-digit Indian mobile number required';
    }
    if (!$lead['email'] || !filter_var($lead['email'], FILTER_VALIDATE_EMAIL)) {
        return 'Valid email required';
    }

    return null;
}

function api_lead_resolve_partner_id(PDO $pdo, ?string $partnerId): ?string
{
    if ($partnerId === null || $partnerId === '') {
        return null;
    }

    $stmt = $pdo->prepare(
        'SELECT partner_id FROM partners WHERE partner_id = :pid AND status = :status LIMIT 1',
    );
    $stmt->execute(['pid' => $partnerId, 'status' => 'approved']);
    $row = $stmt->fetchColumn();

    return is_string($row) && $row !== '' ? $row : null;
}

function api_lead_find_duplicate(PDO $pdo, array $lead): ?array
{
    if (!empty($lead['idempotency_key'])) {
        $stmt = $pdo->prepare('SELECT * FROM leads WHERE idempotency_key = :key LIMIT 1');
        $stmt->execute(['key' => $lead['idempotency_key']]);
        $row = $stmt->fetch();
        if ($row) {
            return $row;
        }
    }

    if (!empty($lead['external_lead_id'])) {
        $stmt = $pdo->prepare('SELECT * FROM leads WHERE external_lead_id = :eid LIMIT 1');
        $stmt->execute(['eid' => $lead['external_lead_id']]);
        $row = $stmt->fetch();
        if ($row) {
            return $row;
        }
    }

    if (!empty($lead['phone']) && !empty($lead['loan_type'])) {
        $stmt = $pdo->prepare(
            'SELECT * FROM leads
             WHERE phone = :phone AND loan_type = :loan_type AND status = :status
               AND created_at >= DATE_SUB(NOW(), INTERVAL :hours HOUR)
             ORDER BY id DESC LIMIT 1',
        );
        $stmt->execute([
            'phone' => $lead['phone'],
            'loan_type' => $lead['loan_type'],
            'status' => 'new',
            'hours' => API_LEAD_DEDUP_HOURS,
        ]);
        $row = $stmt->fetch();
        if ($row) {
            return $row;
        }
    }

    return null;
}

function api_lead_insert(PDO $pdo, array $lead): int
{
    $sql = 'INSERT INTO leads (
        external_lead_id, form_type, source, crm_channel, partner_id, form_variant,
        idempotency_key, full_name, phone, email, city, age,
        employment_type, company_name, monthly_income, work_experience,
        loan_type, loan_amount, tenure_months, existing_emi, purpose, pan, property_value,
        message, page_url, extra_data, ip_address, user_agent
    ) VALUES (
        :external_lead_id, :form_type, :source, :crm_channel, :partner_id, :form_variant,
        :idempotency_key, :full_name, :phone, :email, :city, :age,
        :employment_type, :company_name, :monthly_income, :work_experience,
        :loan_type, :loan_amount, :tenure_months, :existing_emi, :purpose, :pan, :property_value,
        :message, :page_url, :extra_data, :ip_address, :user_agent
    )';

    $stmt = $pdo->prepare($sql);
    $stmt->execute($lead);

    return (int) $pdo->lastInsertId();
}

function api_lead_public_response(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'external_lead_id' => $row['external_lead_id'] ?? null,
        'crm_channel' => $row['crm_channel'] ?? 'website',
        'partner_id' => $row['partner_id'] ?? null,
        'status' => $row['status'] ?? 'new',
        'form_type' => $row['form_type'] ?? null,
        'created_at' => $row['created_at'] ?? null,
    ];
}

/**
 * Central lead processor — used by website and mobile app APIs.
 *
 * @return array{ok:bool, id?:int, duplicate?:bool, lead?:array, error?:string, emails?:array}
 */
function api_process_lead(PDO $pdo, array $config, array $data, string $defaultChannel = 'website'): array
{
    if (!empty($data['_gotcha']) || !empty($data['website'])) {
        return ['ok' => true, 'id' => 0, 'duplicate' => false];
    }

    $lead = api_lead_parse_fields($data);
    if ($lead['crm_channel'] === 'website' && $defaultChannel !== 'website') {
        $lead['crm_channel'] = $defaultChannel;
    }

    $validationError = api_lead_validate_required($lead);
    if ($validationError !== null) {
        return ['ok' => false, 'error' => $validationError];
    }

    if ($lead['partner_id'] !== null) {
        $resolved = api_lead_resolve_partner_id($pdo, $lead['partner_id']);
        $lead['partner_id'] = $resolved;
    }

    $existing = api_lead_find_duplicate($pdo, $lead);
    if ($existing) {
        // Still dual-write so Admin CRM gets the lead even on Hostinger duplicates
        $dupLead = $existing;
        if (is_array($dupLead)) {
            $dupLead['full_name'] = $dupLead['full_name'] ?? $lead['full_name'];
            $dupLead['phone'] = $dupLead['phone'] ?? $lead['phone'];
            $dupLead['email'] = $dupLead['email'] ?? $lead['email'];
            $dupLead['loan_type'] = $dupLead['loan_type'] ?? $lead['loan_type'];
            $dupLead['loan_amount'] = $dupLead['loan_amount'] ?? $lead['loan_amount'];
            $dupLead['city'] = $dupLead['city'] ?? $lead['city'];
            $dupLead['form_type'] = $dupLead['form_type'] ?? $lead['form_type'];
            $dupLead['source'] = $dupLead['source'] ?? $lead['source'];
            $dupLead['page_url'] = $dupLead['page_url'] ?? $lead['page_url'];
            $dupLead['external_lead_id'] = $dupLead['external_lead_id'] ?? $lead['external_lead_id'];
        }
        $kuberone = api_kuberone_sync_lead($config, $data, is_array($dupLead) ? $dupLead : $lead);

        return [
            'ok' => true,
            'id' => (int) $existing['id'],
            'duplicate' => true,
            'lead' => api_lead_public_response($existing),
            'message' => 'We already have your application. Reference #' . $existing['id'],
            'kuberone' => [
                'synced' => (bool) ($kuberone['ok'] ?? false),
                'skipped' => (bool) ($kuberone['skipped'] ?? false),
                'lead_number' => $kuberone['leadNumber'] ?? null,
                'error' => $kuberone['error'] ?? null,
            ],
        ];
    }

    $leadId = api_lead_insert($pdo, $lead);
    $lead['id'] = $leadId;
    $lead['created_at'] = date('Y-m-d H:i:s');
    $lead['status'] = 'new';

    $formType = $lead['form_type'];
    $fullName = $lead['full_name'] ?? 'Applicant';
    $adminSubject = "New {$formType} — {$fullName} (#{$leadId})";
    if (!empty($lead['partner_id'])) {
        $adminSubject .= " [Partner: {$lead['partner_id']}]";
    }
    if ($lead['crm_channel'] !== 'website') {
        $adminSubject .= " [{$lead['crm_channel']}]";
    }

    $adminBody = api_build_admin_email_body($lead, $config);
    $adminMail = api_send_mail_to_admins($adminSubject, $adminBody, $config, $lead['email']);
    $adminSent = (bool) ($adminMail['sent'] ?? false);
    $userSent = api_send_user_confirmation($lead, $config);

    $kuberone = api_kuberone_sync_lead($config, $data, $lead);

    return [
        'ok' => true,
        'id' => $leadId,
        'duplicate' => false,
        'lead' => api_lead_public_response($lead),
        'saved' => 'database',
        'emails' => [
            'admin' => $adminSent,
            'user' => $userSent,
            'admin_recipients' => $adminMail['recipients'] ?? [],
            'smtp_configured' => api_smtp_configured($config),
        ],
        'kuberone' => [
            'synced' => (bool) ($kuberone['ok'] ?? false),
            'skipped' => (bool) ($kuberone['skipped'] ?? false),
            'lead_number' => $kuberone['leadNumber'] ?? null,
            'error' => $kuberone['error'] ?? null,
        ],
    ];
}

function api_verify_mobile_api_key(array $config): bool
{
    $expected = trim((string) ($config['mobile_api_key'] ?? ''));
    if ($expected === '') {
        return false;
    }

    $header = $_SERVER['HTTP_X_MOBILE_API_KEY'] ?? '';
    if ($header !== '' && hash_equals($expected, trim($header))) {
        return true;
    }

    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (preg_match('/^Bearer\s+(\S+)$/i', trim($auth), $m)) {
        return hash_equals($expected, $m[1]);
    }

    return false;
}
