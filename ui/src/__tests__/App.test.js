import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from '../components/App';

afterEach(cleanup);

it('renders the app', () => {
  const { getByTestId } = render(<App />)
  const root = getByTestId('app');
  expect(root).toBeDefined();
});
