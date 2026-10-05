import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb, isSupabase } from '@/lib/db';

function mapRow(row: any) {
  if (!row) return null;
  return {
    id: row.id,
    headline: row.headline,
    subheadline: row.subheadline ?? null,
    ctaText: row.cta_text ?? row.ctaText ?? null,
    ctaLink: row.cta_link ?? row.ctaLink ?? null,
    backgroundImageUrl: row.background_image_url ?? row.backgroundImageUrl ?? null,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = getDb();

  if (req.method === 'GET') {
    try {
      if (isSupabase()) {
        const { data, error } = await db.from('hero_content').select('*').limit(1).single();
        if (error) return res.status(500).json({ error: error.message });
        return res.json(mapRow(data));
      }
      const row = db.prepare('SELECT * FROM hero_content LIMIT 1').get();
      if (!row) return res.status(404).json({ error: 'Not found' });
      return res.json(mapRow(row));
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === 'PUT') {
    const { headline, subheadline, ctaText, ctaLink, backgroundImageUrl } = req.body;
    if (!headline) return res.status(400).json({ error: 'headline is required' });

    try {
      if (isSupabase()) {
        // Get existing row id
        const { data: existing } = await db.from('hero_content').select('id').limit(1).single();
        if (!existing) return res.status(404).json({ error: 'Not found' });
        const { data, error } = await db.from('hero_content').update({
          headline,
          subheadline: subheadline ?? null,
          cta_text: ctaText ?? null,
          cta_link: ctaLink ?? null,
          background_image_url: backgroundImageUrl ?? null,
        }).eq('id', existing.id).select().single();
        if (error) return res.status(500).json({ error: error.message });
        return res.json(mapRow(data));
      }

      const existing = db.prepare('SELECT id FROM hero_content LIMIT 1').get();
      if (!existing) return res.status(404).json({ error: 'Not found' });
      db.prepare(`
        UPDATE hero_content SET headline=?, subheadline=?, cta_text=?, cta_link=?, background_image_url=? WHERE id=?
      `).run(headline, subheadline ?? null, ctaText ?? null, ctaLink ?? null, backgroundImageUrl ?? null, existing.id);
      const updated = db.prepare('SELECT * FROM hero_content WHERE id=?').get(existing.id);
      return res.json(mapRow(updated));
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  res.setHeader('Allow', 'GET, PUT');
  return res.status(405).json({ error: 'Method not allowed' });
}