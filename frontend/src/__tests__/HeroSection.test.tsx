import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/HeroSection';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

const hero = {
  id: 1,
  headline: 'My Portfolio',
  subheadline: 'Designer & Developer',
  ctaText: 'View Work',
  ctaLink: '/projects',
  backgroundImageUrl: 'https://example.com/bg.jpg',
};

describe('HeroSection', () => {
  it('renders all hero fields', () => {
    render(<HeroSection hero={hero} />);
    expect(screen.getByText('My Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Designer & Developer')).toBeInTheDocument();
    // ctaText appears in both data snapshot and mini preview
    expect(screen.getAllByText('View Work').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('/projects')).toBeInTheDocument();
  });

  it('shows add background image prompt when no image', () => {
    render(<HeroSection hero={{ ...hero, backgroundImageUrl: undefined }} />);
    expect(screen.getByText('Add background image')).toBeInTheDocument();
  });
});