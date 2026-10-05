import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroBanner from '@/components/HeroBanner';

jest.mock('framer-motion', () => ({
  motion: { div: (props: any) => <div {...props} /> },
}));

describe('HeroBanner', () => {
  it('renders headline', () => {
    render(<HeroBanner headline="Hello World" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders CTA button when ctaText provided', () => {
    render(<HeroBanner headline="Hi" ctaText="Go" ctaLink="/go" />);
    expect(screen.getByText('Go')).toBeInTheDocument();
  });

  it('shows placeholder when headline empty', () => {
    render(<HeroBanner headline="" />);
    expect(screen.getByText('Your Headline Here')).toBeInTheDocument();
  });
});