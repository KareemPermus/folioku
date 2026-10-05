import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  useRouter: () => ({ pathname: '/' }),
}));

jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

import AppLayout from '@/components/layout/AppLayout';

describe('AppLayout', () => {
  it('renders brand name and nav', () => {
    render(<AppLayout><div>child</div></AppLayout>);
    expect(screen.getByText('Folioku')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('child')).toBeInTheDocument();
  });
});