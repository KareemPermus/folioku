CREATE TABLE IF NOT EXISTS hero_content (
  id SERIAL PRIMARY KEY,
  headline VARCHAR(255) NOT NULL,
  subheadline VARCHAR(500),
  cta_text VARCHAR(100),
  cta_link VARCHAR(500),
  background_image_url TEXT,
  slug TEXT UNIQUE NOT NULL DEFAULT 'main'
);