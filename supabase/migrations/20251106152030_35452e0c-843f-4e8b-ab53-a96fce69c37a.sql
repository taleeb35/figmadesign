-- Make home_hero fields optional
ALTER TABLE home_hero 
ALTER COLUMN main_title DROP NOT NULL,
ALTER COLUMN subtitle DROP NOT NULL,
ALTER COLUMN description DROP NOT NULL,
ALTER COLUMN cta_button_text DROP NOT NULL,
ALTER COLUMN cta_button_link DROP NOT NULL;