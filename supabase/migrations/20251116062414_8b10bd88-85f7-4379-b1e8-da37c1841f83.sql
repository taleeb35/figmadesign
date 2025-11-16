-- Remove old address column and add separate UAE and KSA address columns
ALTER TABLE footer_settings DROP COLUMN IF EXISTS address;
ALTER TABLE footer_settings ADD COLUMN addressuae text NOT NULL DEFAULT 'Business Bay, Dubai, UAE';
ALTER TABLE footer_settings ADD COLUMN addressksa text NOT NULL DEFAULT 'Riyadh, Saudi Arabia';