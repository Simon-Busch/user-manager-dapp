import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders title User Manager', () => {
  render(<App />);
  const titleElement = screen.getByText(/User Manager/i);
  expect(titleElement).toBeInTheDocument();
});
