/**
 * @jest-environment node
 */
import handler from '@/pages/api/hero';
import { createRequest, createResponse } from 'node-mocks-http';

jest.mock('@/lib/db', () => {
  const rows = [{ id: 1, headline: 'Test', subheadline: null, cta_text: null, cta_link: null, background_image_url: null }];
  return {
    getDb: () => ({
      prepare: (sql: string) => ({
        get: () => rows[0],
        run: (...args: any[]) => { rows[0] = { ...rows[0], headline: args[0] }; },
      }),
    }),
    isSupabase: () => false,
  };
});

describe('GET /api/hero', () => {
  it('returns hero content', async () => {
    const req = createRequest({ method: 'GET' });
    const res = createResponse();
    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
    const data = res._getJSONData();
    expect(data.headline).toBe('Test');
    expect(data).toHaveProperty('id');
  });
});

describe('PUT /api/hero', () => {
  it('rejects missing headline', async () => {
    const req = createRequest({ method: 'PUT', body: {} });
    const res = createResponse();
    await handler(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  it('updates hero', async () => {
    const req = createRequest({ method: 'PUT', body: { headline: 'New' } });
    const res = createResponse();
    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
  });
});