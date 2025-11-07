-- Add image_url to about_experience table
ALTER TABLE about_experience ADD COLUMN image_url text;

-- Add image_url and bullet points to about_advantage table
ALTER TABLE about_advantage ADD COLUMN image_url text;
ALTER TABLE about_advantage ADD COLUMN point1 text;
ALTER TABLE about_advantage ADD COLUMN point2 text;
ALTER TABLE about_advantage ADD COLUMN point3 text;
ALTER TABLE about_advantage ADD COLUMN point4 text;
ALTER TABLE about_advantage ADD COLUMN point5 text;
ALTER TABLE about_advantage ADD COLUMN point6 text;