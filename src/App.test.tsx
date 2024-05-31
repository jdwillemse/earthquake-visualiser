import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

jest.mock('query-string', () => ({
  parse: jest.fn(),
}));

test('renders learn react link', () => {
  render(<App />);
  const headerElement = screen.getByRole('heading', { level: 1 });
  expect(headerElement).toHaveTextContent(
    'Earthquakes during the last 24 hours',
  );
});
