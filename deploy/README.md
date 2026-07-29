# Hostinger deploy secrets

1. Copy your live Hostinger `config.php` here as:

   `deploy/config.php`

2. We **never change** that file — `npm run build:hostinger` only copies it into `dist/api/config.php`.

3. Upload everything inside `dist/` to `public_html/`.

`deploy/config.php` is gitignored. Do not commit it.
