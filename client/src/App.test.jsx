import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Components', () => {
  it('renders the application brand in navigation', () => {
    render(<App />);
    expect(screen.getByText(/SmartCampus/i)).not.toBeNull();
  });
});
