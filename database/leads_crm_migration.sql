-- CRM integration — run on existing KuberFinserve deployments (phpMyAdmin)

ALTER TABLE leads
  ADD COLUMN external_lead_id VARCHAR(32) DEFAULT NULL AFTER id,
  ADD COLUMN crm_channel VARCHAR(40) NOT NULL DEFAULT 'website' AFTER source,
  ADD COLUMN partner_id VARCHAR(20) DEFAULT NULL AFTER crm_channel,
  ADD COLUMN form_variant VARCHAR(80) DEFAULT NULL AFTER partner_id,
  ADD COLUMN idempotency_key VARCHAR(64) DEFAULT NULL AFTER form_variant,
  ADD COLUMN property_value VARCHAR(50) DEFAULT NULL AFTER pan;

ALTER TABLE leads ADD UNIQUE KEY uk_external_lead_id (external_lead_id);
ALTER TABLE leads ADD UNIQUE KEY uk_idempotency_key (idempotency_key);
ALTER TABLE leads ADD INDEX idx_partner_id (partner_id);
ALTER TABLE leads ADD INDEX idx_crm_channel (crm_channel);
ALTER TABLE leads ADD INDEX idx_phone_loan_created (phone, loan_type, created_at);
