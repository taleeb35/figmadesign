-- Remove title and display_order from timeline_items
ALTER TABLE timeline_items 
DROP COLUMN IF EXISTS title,
DROP COLUMN IF EXISTS display_order;