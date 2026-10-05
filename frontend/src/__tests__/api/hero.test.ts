import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/hero';

// Mock better-sqlite3 for tests
const mockGet = jest.fn();
const mockRun = jest.fn();
const mockPrepare = jest.fn(() => ({ get: mockGet, run: mockRun }));
const mockExec = jest.fn();
const mockPragma = jest.fn();

jest.mock('better-sqlite3', () => {
  return jest.fn(() => ({
    prepare: mockPrepare,
    exec: mockExec,
    pragma: mockPragma,
  }));
});

describe('/api/hero', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    // Reset db singleton
    jest.resetModules();
  });

  it('GET returns hero content', async () => {
    mockGet.mockReturnValueOnce({ c: 1 }); // count check in getDb
    mockGet.mockReturnValueOnce({ id: 1, headline: 'Hello', subheadline: null, cta_text: 'Click', cta_link: '#', background_image_url: null });

    const { req, res } = createMocks({ method: 'GET' });
    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.headline).toBe('Hello');
    expect(data.ctaText).toBe('Click');
  });

  it('GET returns 404 when no row', async () => {
    mockGet.mockReturnValueOnce({ c: 1 });
    mockGet.mockReturnValueOnce(undefined);

    const { req, res } = createMocks({ method: 'GET' });
    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
  });

  it('PUT returns 400 without headline', async () => {
    mockGet.mockReturnValueOnce({ c: 1 });

    const { req, res } = createMocks({ method: 'PUT', body: {} });
    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('PUT updates hero content', async () => {
    mockGet.mockReturnValueOnce({ c: 1 });
    mockGet.mockReturnValueOnce({ id: 1 });
    mockGet.mockReturnValueOnce({ id: 1, headline: 'Updated', subheadline: 'Sub', cta_text: null, cta_link: null, background_image_url: null });

    const { req, res } = createMocks({ method: 'PUT', body: { headline: 'Updated', subheadline: 'Sub' } });
    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.headline).toBe('Updated');
  });

  it('POST returns 405', async () => {
    mockGet.mockReturnValueOnce({ c: 1 });
    const { req, res } = createMocks({ method: 'POST' });
    await handler(req as any, res as any);
    expect(res._getStatusCode()).toBe(405);
  });
});