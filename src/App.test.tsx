import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
// TODO: rewrite it with jest
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
