# Hostinger Setup — Leads Database + Admin + Email

Yeh guide **form submit → MySQL save → admin panel → user + admin email** ke liye hai.

---

## Part 1 — Hostinger par database banana

1. **hPanel** login → **Websites** → apni site select karo  
2. **Databases** → **MySQL Databases**  
3. **Create database**:
   - Database name (note karo, e.g. `u123456789_kuber`)
   - Username + strong password (note karo)
   - User ko database par **All Privileges** do  
4. **phpMyAdmin** kholo → left side apna database select karo  
5. **SQL** tab → `database/schema.sql` file ka pura content paste karo → **Go**  
   - Table `leads` ban jayegi  

**Note:** Host par DB host aksar `localhost` hota hai (hPanel → database details me likha hota hai).

---

## Part 2 — PHP config (secret file)

1. PC par project folder: `public/api/config.example.php`  
2. Copy karke naam rakho: **`config.php`** (same folder `public/api/`)  
3. Hostinger values bharo:

```php
'db_host' => 'localhost',
'db_name' => 'u123456789_kuber',      // apna DB name
'db_user' => 'u123456789_user',       // apna DB user
'db_pass' => 'YOUR_PASSWORD',

'admin_username' => 'admin',
'admin_password' => 'Apna-Mazboot-Password-123!',

'leads_email' => 'loanleads@kuberfinserve.com',
'from_email' => 'noreply@kuberfinserve.com',
```

4. **`config.php` GitHub par upload mat karo** — sirf server par rakho.

---

## Part 3 — Frontend build + upload

### Local PC par:

```bash
npm install
npm run build
```

`dist` folder banega.

### Hostinger File Manager / FTP:

`public_html` (ya subdomain folder) me upload karo:

| Upload kya | Kahan |
|------------|--------|
| `dist` ke **andar ki saari files** (index.html, assets/, …) | `public_html/` **root** |
| `public/api/` folder (save-lead.php, admin/, …) | `public_html/api/` |
| `public/api/config.php` (jo aapne banayi) | `public_html/api/config.php` |
| `public/.htaccess` | `public_html/.htaccess` |

**Structure example:**

```
public_html/
  index.html
  assets/
  .htaccess
  api/
    config.php          ← secret
    save-lead.php
    bootstrap.php
    db.php
    mailer.php
    admin/
      index.php
      export.php
  send-lead.php         (optional old file)
  images/
```

---

## Part 4 — Test karna (zaroori)

### Step A — Database test (browser)
1. Browser me kholo: **`https://kuberfinserve.com/api/ping.php`**  
2. Agar sahi hai to dikhega:
   ```json
   {"ok":true,"message":"Database connected successfully","leads_count":0,...}
   ```
3. Agar error aaye → `config.php` me DB name/user/password dubara check karo (hPanel → Databases)

### Step B — Form test
1. Website par **Apply Loan** form submit karo (10-digit mobile, valid email)  
2. Browser **F12 → Network** → `save-lead.php` → Response me `"ok":true,"id":123`  
3. **phpMyAdmin** → `u772348073_kuber` → table `leads` → **Browse** → nayi row  
4. **loanleads@kuberfinserve.com** par admin email  
5. Customer ke email par confirmation (spam folder bhi check karo)  
6. Admin panel: **`https://kuberfinserve.com/api/admin/`**

### Agar email aa rahi hai par DB khali hai
- Pehle `save-lead.php` file ke **shuru me space/BOM na ho** — line 1 sirf `<?php` honi chahiye  
- Purani file replace karo: `public/api/save-lead.php` → Hostinger `public_html/api/save-lead.php`  
- Phir `ping.php` test karo, phir form submit

Agar error aaye:
- `api/config.php` missing / galat DB password  
- Table `leads` create nahi hui (`database/schema.sql` run karo)  
- PHP version 8.0+ (Hostinger default OK)

---

## Part 5 — Kya save hota hai

Har form submit par `leads` table me:

- Name, phone, email, city  
- Loan type / product  
- Income, employment, amount, tenure, PAN, message (loan form)  
- Form type (Loan Application / Contact Enquiry)  
- Source (kaunsi page)  
- IP, date/time  

---

## Part 6 — Admin panel

| URL | Kaam |
|-----|------|
| `/api/admin/` | Login → saari leads list |
| Search box | Name / phone / email / loan |
| Status dropdown | new → contacted → closed |
| Export CSV | Download all leads |

Password change: `api/config.php` me `admin_password` edit karo.

---

## Part 7 — Email issues (Hostinger)

- `mail()` kabhi **spam** me jata hai — inbox + spam check karo  
- `from_email` domain wala hona chahiye: `noreply@kuberfinserve.com`  
- Hostinger → **Emails** → domain email banao agar `mail()` fail ho  
- Backup: `.env` me `VITE_WEB3FORMS_ACCESS_KEY` (agar PHP fail ho to email fallback)

---

## Part 8 — Local development

Local par PHP/MySQL nahi hai to form **Web3Forms** (agar key ho) ya error dikh sakta hai.

Live test ke liye:
- Site Hostinger par upload karo, ya  
- `.env` me: `VITE_LEAD_API_URL=https://kuberfinserve.com`

---

## Quick checklist

- [ ] MySQL database + user created  
- [ ] `schema.sql` run in phpMyAdmin  
- [ ] `api/config.php` uploaded with correct credentials  
- [ ] `npm run build` → `dist` uploaded to `public_html`  
- [ ] `api/` folder uploaded  
- [ ] `.htaccess` uploaded  
- [ ] Form test → row in phpMyAdmin  
- [ ] Admin login works  
- [ ] Emails received (user + admin)

---

## Files reference (project me)

| File | Purpose |
|------|---------|
| `database/schema.sql` | Table create SQL |
| `public/api/save-lead.php` | Form API — DB + emails |
| `public/api/config.example.php` | Config template |
| `public/api/admin/index.php` | Admin UI |
| `src/utils/submitLeadApi.ts` | Frontend → PHP call |
| `src/utils/leads.ts` | Loan + contact submit |

Support: agar deploy ke baad error ho, browser **Network** tab me `save-lead.php` response dekho — wahan exact error JSON me aata hai.
