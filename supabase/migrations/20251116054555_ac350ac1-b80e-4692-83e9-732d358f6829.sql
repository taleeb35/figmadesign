-- Remove old phone column and add two new phone columns
ALTER TABLE footer_settings
DROP COLUMN IF EXISTS phone;

-- Add UAE phone number
ALTER TABLE footer_settings
ADD COLUMN phoneuae text NOT NULL DEFAULT '+971856784543';

-- Add KSA phone number
ALTER TABLE footer_settings
ADD COLUMN phoneksa text NOT NULL DEFAULT '+966123456789';