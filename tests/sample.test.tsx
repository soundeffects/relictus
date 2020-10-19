import * as React from 'react';
import { render } from '@testing-library/react';
import Log from '../src/components/Log';

test('renders learn react link', () => {
  const { getByText } = render(<Log />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
