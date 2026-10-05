import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/pages/index';
import apiClient from '@/api/client';

jest.mock('@/api/client', () => ({
  __esModule: true,
  default: { get: jest.fn() },
}));

const mockHero = {
  id: 1,
  headline: 'Test Headline',
  subheadline: 'Test Sub',
  ctaText: 'Click Me',
  ctaLink: '/work',
  backgroundImageUrl: null,
};

describe('Home page', () => {
  it('renders hero content after loading', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({ data: mockHero });
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText('Test Headline')).toBeInTheDocument();
    });
    expect(screen.getByText('Test Sub')).toBeInTheDocument();
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('shows error state on failure', async () => {
    (apiClient.get as jest.Mock).mockRejectedValue(new Error('Network error'));
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('shows loading spinner initially', () => {
    (apiClient.get as jest.Mock).mockReturnValue(new Promise(() => {}));
    const { container } = render(<Home />);
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });
});