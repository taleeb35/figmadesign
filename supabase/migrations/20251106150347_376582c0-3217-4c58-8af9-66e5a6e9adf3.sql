-- Add video_url field to home_hero table
ALTER TABLE home_hero ADD COLUMN IF NOT EXISTS video_url text;

COMMENT ON COLUMN home_hero.video_url IS 'URL for the hero video (YouTube embed or direct video file URL)';