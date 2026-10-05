INSERT INTO hero_content (slug, headline, subheadline, cta_text, cta_link, background_image_url)
VALUES ('main', 'Welcome to My Portfolio', 'Designer & Developer crafting digital experiences', 'View My Work', '#projects', NULL)
ON CONFLICT (slug) DO NOTHING;