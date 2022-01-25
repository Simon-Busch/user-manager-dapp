import { render, screen } from '@testing-library/react';
import Greetings from './Greetings';

test('renders greetings component', () => {
  render(<Greetings />);
  const welcomeElement = screen.getByText(/Hey ! Welcome back/i);
  expect(welcomeElement).toBeInTheDocument();
});
