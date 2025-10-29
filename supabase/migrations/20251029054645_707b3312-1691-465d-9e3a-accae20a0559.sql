-- Drop the old statistics table and category relationship
ALTER TABLE statistics DROP COLUMN IF EXISTS category_id;
ALTER TABLE statistics DROP COLUMN IF EXISTS image_url;
ALTER TABLE statistics DROP COLUMN IF EXISTS external_link;

-- Add new columns to match content_items structure
ALTER TABLE statistics ADD COLUMN content_type content_type NOT NULL DEFAULT 'pdf';
ALTER TABLE statistics ADD COLUMN category_id uuid REFERENCES content_categories(id);
ALTER TABLE statistics ADD COLUMN cover_image_url text;
ALTER TABLE statistics ADD COLUMN english_pdf_url text;
ALTER TABLE statistics ADD COLUMN arabic_pdf_url text;
ALTER TABLE statistics ADD COLUMN english_flipbook_url text;
ALTER TABLE statistics ADD COLUMN arabic_flipbook_url text;
ALTER TABLE statistics ADD COLUMN youtube_url text;

-- Update the foreign key to point to content_categories instead of statistics_categories
-- The constraint was already dropped with the column, so we just add the new one with the column above

-- Drop statistics_categories table as we're now using content_categories
DROP TABLE IF EXISTS statistics_categories CASCADE;