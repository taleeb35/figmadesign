-- Remove unused fields from home_hero table
ALTER TABLE home_hero 
  DROP COLUMN IF EXISTS subtitle,
  DROP COLUMN IF EXISTS description,
  DROP COLUMN IF EXISTS cta_button_text,
  DROP COLUMN IF EXISTS cta_button_link,
  DROP COLUMN IF EXISTS background_image_url;