import path from 'path';

let db: any = null;

export function getDb() {
  if (db) return db;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { createClient } = require('@supabase/supabase-js');
    db = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    return db;
  }

  const Database = require('better-sqlite3');
  db = new Database(path.join('/tmp', 'app.db'));
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS hero_content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      headline TEXT NOT NULL,
      subheadline TEXT,
      cta_text TEXT,
      cta_link TEXT,
      background_image_url TEXT
    )
  `);

  const count = db.prepare('SELECT COUNT(*) as c FROM hero_content').get();
  if (count.c === 0) {
    db.prepare(`
      INSERT INTO hero_content (headline, subheadline, cta_text, cta_link, background_image_url)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      'Welcome to My Portfolio',
      'Designer & Developer crafting digital experiences',
      'View My Work',
      '#projects',
      null
    );
  }

  return db;
}

export function isSupabase(): boolean {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL;
}