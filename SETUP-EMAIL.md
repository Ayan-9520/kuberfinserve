# Form emails — admin + customer Gmail

Form submit par **2 emails** jati hain:

1. **loanleads@kuberfinserve.com** — nayi lead
2. **Customer ke Gmail** — "We received your application" confirmation

Database save alag se hota hai (`save-lead.php`). Agar sirf DB me entry hai par Gmail par kuch nahi — **SMTP configure karo** (PHP `mail()` aksar fail hota hai).

---

## Local test (`npm run dev`)

1. Project root me `.env` banao (`.env.example` copy karo)
2. Gmail App Password set karo:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=apka@gmail.com
SMTP_PASS=16_char_app_password
SMTP_FROM=apka@gmail.com
LEADS_TO=loanleads@kuberfinserve.com
VITE_USE_SMTP_API=true
```

3. `Ctrl+C` → `npm run dev` (Vite + email API dono start)
4. Form submit → apna Gmail + spam check karo

---

## Live site (Hostinger)

`public_html/api/config.php` me add karo:

```php
'from_email' => 'loanleads@kuberfinserve.com',
'smtp_host' => 'smtp.hostinger.com',
'smtp_port' => 587,
'smtp_secure' => 'tls',
'smtp_user' => 'loanleads@kuberfinserve.com',
'smtp_pass' => 'EMAIL_ACCOUNT_PASSWORD',
```

Hostinger panel → Emails → mailbox password = `smtp_pass`

Upload updated files: `api/mailer.php`, `api/save-lead.php`

---

## Web3Forms (optional)

Sirf **admin** email ke liye. Customer Gmail ke liye phir bhi **SMTP** chahiye.

```env
VITE_WEB3FORMS_ACCESS_KEY=your_key
```

---

## Test checklist

- [ ] Form submit → success message
- [ ] Admin inbox: loanleads@...
- [ ] Customer inbox: form wala Gmail (spam bhi dekho)
- [ ] Agar fail: browser Network tab → `save-lead.php` response me `emails: { admin, user }`
