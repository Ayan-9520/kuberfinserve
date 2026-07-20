# Full flow setup — Email + Admin leads + Visitors + Partners

Screenshot issue (`Could not send email via SMTP` + lead missing in Admin) means **two separate configs** failed on the live site:

1. **SMTP** in Hostinger `api/config.php` (wrong/missing mailbox password)
2. **KuberOne bridge** URL/key (often still `localhost` or placeholder — Hostinger cannot call your PC)

---

## Architecture (simple)

```
Browser form (kuberfinserve.com)
   ↓
public_html/api/save-lead.php  (or save-partner / save-visitor)
   ↓
① Hostinger MySQL     → always first
② SMTP emails         → needs smtp_* in config.php
③ KuberOne Admin API  → needs PUBLIC kuberone_api_base + matching key
```

Local Admin (`http://localhost:5173`) only receives leads when the **website also runs locally** (`npm run dev`) with `KUBERONE_API_BASE=http://127.0.0.1:4000`.

Live website → live Admin API URL required (or an HTTPS tunnel to your Docker `:4000`).

---

## File → key map (copy this)

### A) Hostinger — create `public_html/api/config.php` (from `config.example.php`)

| Key | Example | Purpose |
|-----|---------|---------|
| `db_host` | `localhost` | MySQL |
| `db_name` | `uXXXX_kuberfinserve` | MySQL DB |
| `db_user` | `uXXXX_user` | MySQL user |
| `db_pass` | *(hPanel password)* | MySQL pass |
| `leads_email` | `loanleads@kuberfinserve.com` | Admin inbox |
| `site_email` | `info@kuberfinserve.com` | Also notified |
| `from_email` | `loanleads@kuberfinserve.com` | From address |
| `smtp_host` | `smtp.hostinger.com` | SMTP server |
| `smtp_port` | `587` | Or `465` if 587 fails |
| `smtp_secure` | `tls` | Or `ssl` with 465 |
| `smtp_user` | `loanleads@kuberfinserve.com` | Mailbox email |
| `smtp_pass` | *(mailbox password from hPanel → Emails)* | **This fixes SMTP error** |
| `jwt_secret` | long random string | Partner JWT |
| `mobile_api_key` | random string | Mobile app leads |
| `kuberone_bridge_enabled` | `true` | Turn dual-write on |
| `kuberone_api_base` | `https://YOUR-PUBLIC-API` | **NOT localhost on live site** |
| `kuberone_api_key` | same as KuberOne | Auth header |
| `kuberone_partner_auth_enabled` | `true` | Partner OTP via KuberOne |

### B) KuberOne Docker / backend — `kuberapp/.env` + `.env.docker`

| Key | Example | Purpose |
|-----|---------|---------|
| `WEBSITE_INTAKE_API_KEY` | `kuber-website-intake-local-key` | Must **equal** `kuberone_api_key` |
| `CORS_ORIGINS` | include `https://kuberfinserve.com` | Browser CORS (server→server also OK) |
| `DATABASE_URL` | `mysql://root@mysql:3306/kuberone_dev` | Docker DB |

Restart after change: `docker compose up -d backend`

### C) Local website only — `kuberfinserve/.env`

| Key | Example | Purpose |
|-----|---------|---------|
| `SMTP_HOST` | `smtp.gmail.com` or Hostinger | Local email |
| `SMTP_PORT` | `587` | |
| `SMTP_USER` | your mailbox | |
| `SMTP_PASS` | app/mailbox password | |
| `SMTP_FROM` | same as user | |
| `LEADS_TO` | `loanleads@kuberfinserve.com` | Admin copy |
| `VITE_USE_SMTP_API` | `true` | Use `/api/send-lead.php` fallback |
| `KUBERONE_BRIDGE_ENABLED` | `true` | Dual-write |
| `KUBERONE_API_BASE` | `http://127.0.0.1:4000` | Local Docker API |
| `KUBERONE_API_KEY` | `kuber-website-intake-local-key` | Match KuberOne |
| `KUBERONE_PARTNER_AUTH_ENABLED` | `true` | Partner OTP |

Restart: `npm run dev`

---

## Upload checklist (Hostinger)

### 1. Build on PC

```bash
cd E:\Projects\kuberfinserve
npm install
npm run build
```

### 2. Upload `dist/*` → `public_html/`

Must include:

```
public_html/
  index.html
  assets/
  .htaccess
  api/
    config.php              ← CREATE on server (secrets)
    config.example.php
    bootstrap.php
    db.php
    mailer.php
    lead_service.php
    kuberone_bridge.php
    save-lead.php
    save-partner.php
    save-visitor.php
    send-lead.php
    partner-login.php
    partner_notify.php
    partner_helpers.php
    jwt.php
    ping.php
    smtp-test.php           ← new diagnostic
    bridge-test.php         ← new diagnostic
    admin/
    mobile/
```

Frontend rebuild is required when `src/` changes. **SMTP/bridge keys alone** only need editing `config.php` (no rebuild).

### 3. Database

phpMyAdmin → run `database/schema.sql` (or at least `database/website_visitors_migration.sql` if DB already exists).

### 4. Verify (open in browser)

| URL | Expect |
|-----|--------|
| `/api/ping.php` | `ok:true`, `smtp_configured:true` |
| `/api/smtp-test.php` | test mail in `loanleads@…` inbox |
| `/api/bridge-test.php` | `ok:true` (Admin API reachable) |

### 5. Form smoke tests

| Flow | Check |
|------|-------|
| Loan / Contact | Network `save-lead.php` → `ok:true`, `emails.admin/user:true`, `kuberone.synced:true` |
| Visitor popup | `save-visitor.php` → `ok:true` + Admin → Website Visitors |
| Become Partner | `save-partner.php` → Admin → Partners (PENDING) |

Admin login (Docker): `http://localhost:5173` → `admin@kuberone.com` / `Admin@123` → **Leads** (source Website).

---

## Why your live form showed SMTP warning but still got a reference

Reference `KFS-…` = **MySQL save succeeded**.  
Yellow “Could not send email via SMTP” = **mailbox password / SMTP config wrong**.  
Empty Admin = **bridge URL/key wrong** (or API not public).

Fix order: `smtp_pass` → `smtp-test.php` → set public `kuberone_api_base` + matching key → `bridge-test.php` → resubmit form.
