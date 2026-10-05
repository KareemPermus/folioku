import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection from '@/pages/hero-section';
import apiClient from '@/api/client';

jest.mock('@/api/client', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    put: jest.fn(),
  },
}));

jest.mock('framer-motion', () => ({
  motion: { div: (props: any) => <div {...props} /> },
}));

const mockHero = {
  id: 1,
  headline: 'Test Headline',
  subheadline: 'Test Sub',
  ctaText: 'Click Me',
  ctaLink: '/test',
  backgroundImageUrl: null,
};

describe('HeroSection page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (apiClient.get as jest.Mock).mockResolvedValue({ data: mockHero });
  });

  it('renders editor with fetched data', async () => {
    render(<HeroSection />);
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Headline')).toBeInTheDocument();
    });
    expect(screen.getByDisplayValue('Test Sub')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Click Me')).toBeInTheDocument();
  });

  it('shows error on fetch failure', async () => {
    (apiClient.get as jest.Mock).mockRejectedValue(new Error('fail'));
    render(<HeroSection />);
    await waitFor(() => {
      expect(screen.getByText('Failed to load hero content.')).toBeInTheDocument();
    });
  });

  it('saves hero content on button click', async () => {
    (apiClient.put as jest.Mock).mockResolvedValue({ data: { ...mockHero, headline: 'Updated' } });
    render(<HeroSection />);
    await waitFor(() => screen.getByDisplayValue('Test Headline'));
    fireEvent.click(screen.getByText('Save Changes'));
    await waitFor(() => {
      expect(apiClient.put).toHaveBeenCalledWith('/api/hero', expect.objectContaining({ headline: 'Test Headline' }));
    });
  });
});