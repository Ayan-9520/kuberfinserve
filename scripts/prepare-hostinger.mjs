/**
 * Build Hostinger-ready folder: dist/ with config.php + schema + upload guide.
 *
 * Usage:
 *   1. Put live config at: deploy/config.php  (gitignored)
 *   2. npm run build:hostinger
 *   3. Upload ALL files inside dist/ → public_html/
 */
import { existsSync, mkdirSync, writeFileSync, copyFileSync, cpSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const deployConfig = join(root, 'deploy', 'config.php')
const distConfig = join(dist, 'api', 'config.php')
const schemaSrc = join(root, 'database', 'schema.sql')

console.log('→ Building production bundle…')
execSync('npm run build', { cwd: root, stdio: 'inherit', env: { ...process.env, NODE_ENV: 'production' } })

if (!existsSync(join(dist, 'index.html'))) {
  console.error('Build failed: dist/index.html missing')
  process.exit(1)
}

if (!existsSync(join(dist, 'api', 'save-lead.php'))) {
  console.error('Build failed: dist/api PHP files missing (public/ not copied)')
  process.exit(1)
}

mkdirSync(join(root, 'deploy'), { recursive: true })

let configStatus = 'MISSING — keep existing public_html/api/config.php on Hostinger'
if (existsSync(deployConfig)) {
  copyFileSync(deployConfig, distConfig)
  configStatus = 'INCLUDED (deploy/config.php → api/config.php)'
} else if (existsSync(distConfig)) {
  configStatus = 'Already present in dist'
}

mkdirSync(join(dist, 'database'), { recursive: true })
if (existsSync(schemaSrc)) {
  copyFileSync(schemaSrc, join(dist, 'database', 'schema.sql'))
  for (const name of [
    'leads_crm_migration.sql',
    'partners_migration.sql',
    'website_visitors_migration.sql',
  ]) {
    const p = join(root, 'database', name)
    if (existsSync(p)) copyFileSync(p, join(dist, 'database', name))
  }
}

const readme = `KUBERFINSERVE — HOSTINGER UPLOAD (READ THIS)
============================================
Generated: ${new Date().toISOString()}
config.php: ${configStatus}

STEP A — DATABASE (phpMyAdmin) — pehle ye karo
----------------------------------------------
1. Hostinger hPanel → Databases → MySQL
2. Confirm DB name matches api/config.php (u772348073_kuber)
3. phpMyAdmin → select that database → SQL tab
4. Open this package file: database/schema.sql
5. Copy ALL SQL → paste in SQL tab → Go / Run
   (CREATE IF NOT EXISTS — do baar chalana safe hai)

Tables banne chahiye:
  leads | partners | partner_audit_log | website_visitors

STEP B — UPLOAD FILES
---------------------
1. Hostinger File Manager → public_html/
2. Is dist/ folder ke ANDAR ki SAARI files upload karo:
     index.html
     .htaccess
     assets/
     api/          ← config.php yahan pehle se hai
     database/     ← schema (reference; DB me already run kar chuke)
     logos, images, etc.
3. Overwrite old files when asked (YES)
4. Confirm: public_html/api/config.php exists

STEP C — VERIFY (browser)
-------------------------
1. https://YOUR-DOMAIN/api/ping.php
   → ok:true, smtp_configured:true, database name dikhe
2. https://YOUR-DOMAIN/api/smtp-test.php
   → loanleads + info me test mail
3. Loan / Contact form submit
   → DB leads row
   → email ① loanleads ② info ③ user confirmation
4. Become Partner form
   → DB partners PENDING
   → email ①+② admins + ③ partner confirmation
   → KuberOne Admin me partner (agar API/tunnel ON)
5. https://YOUR-DOMAIN/api/bridge-test.php
   → KuberOne reachable

EMAILS (config me set)
----------------------
① loanleads@kuberfinserve.com  — admin alert
② info@kuberfinserve.com       — admin alert
③ form user email              — confirmation

KuberOne CRM
------------
config: kuberone_api_base = https://kuberone.online
API key must match WEBSITE_INTAKE_API_KEY on KuberOne.
Agar bridge-test fail: PC pe Docker + API tunnel ON karo.
`

writeFileSync(join(dist, 'HOSTINGER-UPLOAD.txt'), readme, 'utf8')
writeFileSync(join(dist, 'UPLOAD-KARNE-SE-PEHLE-PADHO.txt'), readme, 'utf8')

console.log('')
console.log('✓ Hostinger package ready: dist/')
console.log(`  config.php: ${configStatus}`)
console.log('  database/schema.sql copied')
console.log('')
console.log('Next: upload ALL files inside dist/ → Hostinger public_html/')
