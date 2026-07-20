# Hostinger Deploy Guide — KuberFinserve (ready to upload)

Website forms → Hostinger MySQL + emails → optional KuberOne Admin CRM.

---

## What works (connected)

| Flow | Saves to DB | Email admin | Email user | KuberOne CRM |
|------|-------------|-------------|------------|--------------|
| Loan / Contact / Apply / Chat leads | `leads` | Yes (SMTP) | Yes | Yes (if bridge on) |
| Partner apply | `partners` | Yes | Yes | Yes (PENDING) |
| Visitor city popup | `website_visitors` | No | No | Yes (Website Visitors) |
| Partner Login OTP | — | — | OTP via KuberOne | Prefer KuberOne ACTIVE |

Visitor popup: **har page open / reload** pe ~3s baad aata hai (submit ke baad usi tab session me dubara nahi). Force: `?visitor=1`

---

## Step 1 — Database (phpMyAdmin)

1. hPanel → **Databases** → MySQL → create DB + user (All Privileges)
2. phpMyAdmin → select DB → **SQL** tab
3. Run **`database/schema.sql`** (creates `leads`, `partners`, `partner_audit_log`, `website_visitors`)

**Agar purani DB pehle se hai** (tables already exist), separately run:
- `database/leads_crm_migration.sql` (if needed)
- `database/partners_migration.sql` (if needed)
- `database/website_visitors_migration.sql` (**required** for visitor popup)

Confirm tables: `leads`, `partners`, `partner_audit_log`, `website_visitors`

---

## Step 2 — Local build

PC pe `kuberfinserve` folder:

```bash
npm install
npm run build
```

`dist/` folder banega. Vite `public/` (api, logos, .htaccess) ko `dist/` me copy karta hai.

---

## Step 3 — Upload to Hostinger (`public_html`)

`dist/` ke **andar ki saari files** upload karo → `public_html/` root:

```
public_html/
  index.html
  assets/                 ← JS/CSS build
  .htaccess               ← SPA routing (api/ rewrite nahi hota)
  kuberone-logo.png
  logo.png
  api/
    config.php            ← YOU CREATE (see Step 4) — never commit
    config.example.php
    .htaccess
    bootstrap.php
    db.php
    mailer.php
    lead_service.php
    save-lead.php
    save-partner.php
    save-visitor.php      ← visitor popup
    partner-login.php
    partner_notify.php
    partner_helpers.php
    kuberone_bridge.php
    jwt.php
    ping.php
    send-lead.php
    admin/
      index.php
      export.php
      partners.php
      bootstrap.php
    mobile/
      save-lead.php
```

**Important files list (must exist under `public_html/api/`):**  
`save-lead.php`, `save-partner.php`, `save-visitor.php`, `partner-login.php`, `kuberone_bridge.php`, `lead_service.php`, `mailer.php`, `partner_notify.php`, `db.php`, `bootstrap.php`, `jwt.php`, `ping.php`, `admin/*`

---

## Step 4 — `api/config.php` (server only)

1. Copy `api/config.example.php` → **`api/config.php`**
2. Fill Hostinger values:

```php
'db_host' => 'localhost',
'db_name' => 'uXXXX_yourdb',
'db_user' => 'uXXXX_user',
'db_pass' => 'YOUR_DB_PASSWORD',

'admin_username' => 'admin',
'admin_password' => 'Strong-Password-Here!',

'leads_email' => 'loanleads@kuberfinserve.com',
'site_email' => 'info@kuberfinserve.com',
'from_email' => 'loanleads@kuberfinserve.com',

'smtp_host' => 'smtp.hostinger.com',
'smtp_port' => 587,
'smtp_secure' => 'tls',
'smtp_user' => 'loanleads@kuberfinserve.com',
'smtp_pass' => 'YOUR_EMAIL_PASSWORD',

'jwt_secret' => 'long-random-64-char-secret',
'mobile_api_key' => 'random-mobile-key',

// KuberOne dual-write (production API URL — NOT localhost)
'kuberone_bridge_enabled' => true,
'kuberone_api_base' => 'https://api.YOUR-KUBERONE-DOMAIN.com',
'kuberone_api_key' => 'SAME_AS_WEBSITE_INTAKE_API_KEY',
'kuberone_partner_auth_enabled' => true,
```

`config.php` Git me mat daalo — sirf server pe rakho.

**Keys must match:**

| Hostinger `config.php` | KuberOne backend `.env` |
|------------------------|-------------------------|
| `kuberone_api_key` | `WEBSITE_INTAKE_API_KEY` |
| `kuberone_api_base` | Public API base URL (HTTPS) |

---

## Step 5 — KuberOne (CRM) side

On KuberOne backend `.env`:

```env
WEBSITE_INTAKE_API_KEY=SAME_AS_config.php_kuberone_api_key
CORS_ORIGINS=https://kuberfinserve.com,https://www.kuberfinserve.com
```

- Run website_visitors Prisma migration (Admin Visitors page)
- Restart API after env change
- Health: `GET /api/v1/public/website/health` with API key header

Partner OTP: approve partner in **KuberOne Admin** (ACTIVE). Hostinger password login alag path hai.

---

## Step 6 — Smoke tests (deploy ke baad)

| # | Test | Expected |
|---|------|----------|
| 1 | `https://yoursite.com/api/ping.php` | `"ok":true` + DB + `smtp_configured` |
| 2 | `https://yoursite.com/api/smtp-test.php` | test mail in leads inbox |
| 3 | `https://yoursite.com/api/bridge-test.php` | `"ok":true` (KuberOne reachable) |
| 4 | Open homepage → ~3s visitor popup → city submit | phpMyAdmin `website_visitors` + Admin Visitors |
| 5 | Apply Loan / Contact form | `leads` row + admin email + user email + Admin Leads |
| 6 | Become Partner form | `partners` PENDING + emails + KuberOne partner |
| 7 | F12 → Network `save-lead.php` | `"ok":true` + `"kuberone":{"synced":true}` |

Full key map + upload list: see **`FULL-FLOW-SETUP.md`**.

Local force visitor: `http://localhost:5175/?visitor=1`

---

## Email notes

- Hostinger mailbox SMTP use karo (`smtp.hostinger.com`) — PHP `mail()` Gmail pe fail ho sakta hai
- Admin = `leads_email`
- User confirmation = form wala email
- Visitor popup email nahi bhejta (by design)

Details: `SETUP-EMAIL.md`

---

## Common mistakes

1. `docker compose` **kuberfinserve** me mat chalao — Docker sirf `kuberapp` me hai  
2. `kuberone_api_base` localhost mat chhodo production pe  
3. Sirf `schema.sql` purani DB pe skip → visitors migration alag se chalao  
4. `config.php` upload bhoolna → forms 500  
5. Build ke bina sirf source upload → site tootegi; hamesha `npm run build` → `dist/` upload

---

## Quick checklist

- [ ] MySQL: `schema.sql` (or migrations)  
- [ ] `npm run build`  
- [ ] Upload `dist/*` → `public_html/`  
- [ ] `api/config.php` filled  
- [ ] SMTP works  
- [ ] KuberOne key + CORS  
- [ ] ping + lead + visitor + partner tested  
