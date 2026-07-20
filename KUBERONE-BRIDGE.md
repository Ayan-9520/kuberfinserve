# KuberFinserve website ↔ KuberOne Admin bridge

Folders stay separate:

- `E:\Projects\kuberapp` — Admin, API, mobile apps
- `E:\Projects\kuberfinserve` — marketing website (Hostinger)

Website UI is unchanged. After a lead/partner is saved on Hostinger (MySQL + email), PHP also dual-writes to KuberOne.

## Endpoints (KuberOne)

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/v1/public/website/leads` | Website loan/contact lead → Admin Leads (`source=WEBSITE`) |
| `POST` | `/api/v1/public/website/partners` | Become Partner → KuberOne partner `PENDING` |
| `POST` | `/api/v1/public/website/partner-auth` | Partner Login OTP (mobile / email / Partner Code) |
| `POST` | `/api/v1/public/website/visitors` | Visitor interest popup (city + optional contact) → `website_visitors` |
| `GET` | `/api/v1/public/website/health` | Health check |
| `GET` | `/api/v1/leads/website-visitors` | Admin list (session + `leads.read`) |

Header when configured: `X-Website-Api-Key: <WEBSITE_INTAKE_API_KEY>`

## Env — KuberOne (`kuberapp`)

`.env` / `.env.docker`:

```env
CORS_ORIGINS=...,https://kuberfinserve.com,https://www.kuberfinserve.com
# Optional but recommended in production:
WEBSITE_INTAKE_API_KEY=change-me-website-intake-key-min-16
```

`kuberfinserve.com` is also allowed in code via hardcoded origin check.

Restart API after env change (`docker compose up -d backend` or local `pnpm` start).

## Env — Website Hostinger (`public/api/config.php`)

Copy from `public/api/config.example.php` and set:

```php
'kuberone_bridge_enabled' => true,
'kuberone_api_base' => 'https://api.YOUR-KUBERONE-DOMAIN.com', // or http://127.0.0.1:4000 for local
'kuberone_api_key' => 'same-as-WEBSITE_INTAKE_API_KEY',
'kuberone_partner_auth_enabled' => true, // optional: Partner Login OTP via KuberOne
```

## Env — Website local dev (`.env`)

```env
KUBERONE_BRIDGE_ENABLED=true
KUBERONE_API_BASE=http://127.0.0.1:4000
KUBERONE_API_KEY=kuber-website-intake-local-key
KUBERONE_PARTNER_AUTH_ENABLED=true
```

Must match `WEBSITE_INTAKE_API_KEY` on KuberOne (`apps/backend/.env`).

**Partner login (after Admin Approve → ACTIVE):**
- Website `/partner-login` or Partner App `:8082` — mobile / email / Partner Code → OTP on registered mobile (dev OTP `123456`).

**Restart both** after env change:
1. KuberOne API (`:4000`)
2. Website `npm run dev` (reloads `server/lead-api.mjs`)

Then submit any loan form → Admin **Leads** → filter source **Website**.

## Quick verify

```bash
# Health
curl http://127.0.0.1:4000/api/v1/public/website/health

# Via website lead API (dev)
curl -X POST http://127.0.0.1:8787/api/save-lead.php \
  -H "Content-Type: application/json" \
  -d "{\"form_type\":\"Lead\",\"source\":\"test\",\"fields\":{\"full_name\":\"Test User\",\"phone\":\"9876543210\",\"email\":\"t@example.com\",\"loan_type\":\"Personal Loan\",\"loan_amount\":\"500000\"}}"
```

Response should include `"kuberone":{"synced":true,"lead_number":"KFL-…"}`.

## Dual-write behavior (industry)

1. Website form submits as today → Hostinger MySQL + emails **always** run first.
2. Then bridge calls KuberOne (8s timeout).
3. If KuberOne fails, website still returns **success** to the user; error is logged / returned under `kuberone.error` for ops.
4. Admin panel shows the lead under **Leads** with source **Website**.

## Partner flow (Become Partner)

1. Open `http://localhost:5175/become-partner`
2. Fill **Partner Registration** (Contact → Location → Business) and submit
3. Website saves locally **and** dual-writes to KuberOne
4. Open **Admin → Partners**
5. Find the new row — status **PENDING**, type DSA, code like `DSA-XXXXXX`

Quick API check:

```bash
curl -X POST http://127.0.0.1:8787/api/save-partner.php \
  -H "Content-Type: application/json" \
  -d "{\"source\":\"test\",\"fields\":{\"name\":\"Test Partner\",\"phone\":\"9876501234\",\"email\":\"p@example.com\",\"city\":\"Delhi\",\"state\":\"Delhi\",\"business_type\":\"Loan Consultant\"}}"
```

Expect: `"kuberone":{"synced":true,"partner_code":"DSA-…"}`

Admin login: `admin@kuberone.com` / `Admin@123`

## Hostinger deploy (upload these)

```
public/api/kuberone_bridge.php          (new)
public/api/lead_service.php             (updated)
public/api/save-partner.php             (updated)
public/api/partner-login.php            (updated)
public/api/config.php                   (edit on server — do not commit secrets)
```

No frontend rebuild required for dual-write (PHP-only).

## Local test checklist

1. Start KuberOne API on `:4000` (Docker or local).
2. Enable bridge in website `config.php` or `.env`.
3. Submit a loan form on the website → Hostinger/local save OK.
4. Open Admin → **Leads** → new lead with source Website.
5. Submit Become Partner → Admin → **Partners** shows pending DSA.
6. (Optional) Partner Login OTP with mobile → KuberOne session token returned.

## Product mapping (website loan type → KuberOne product code)

| Website | Product |
|---------|---------|
| Home Loan | HL-01 |
| LAP | LAP-01 |
| New / Used Car | AL-01 / AL-02 |
| Personal / Education | PL-01 |
| Business | BL-01 |
| Machinery | ML-01 |
| Insurance | INS-01 |
| Credit Card | CC-01 |
