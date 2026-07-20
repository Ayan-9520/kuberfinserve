-- Website visitor interest popup — run on Hostinger (phpMyAdmin) if CREATE TABLE IF NOT EXISTS is preferred separately

CREATE TABLE IF NOT EXISTS website_visitors (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  external_visitor_id VARCHAR(64) NULL,
  city VARCHAR(100) NOT NULL,
  name VARCHAR(200) NULL,
  phone VARCHAR(15) NULL,
  email VARCHAR(255) NULL,
  page_url VARCHAR(500) NULL,
  referrer VARCHAR(500) NULL,
  utm_source VARCHAR(120) NULL,
  utm_medium VARCHAR(120) NULL,
  utm_campaign VARCHAR(120) NULL,
  session_id VARCHAR(64) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_external_visitor_id (external_visitor_id),
  KEY idx_city (city),
  KEY idx_phone (phone),
  KEY idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
