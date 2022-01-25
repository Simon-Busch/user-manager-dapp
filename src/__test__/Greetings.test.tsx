import { render, screen } from '@testing-library/react';
import Greetings from '../components/Greetings/Greetings';

test('renders greetings component', () => {
  render(<Greetings />);
  const welcomeElement = screen.getByText(/Hey ! Welcome back/i);
  expect(welcomeElement).toBeInTheDocument();
});

describe("when rendered with an account prop", () => {
  it("should paste it into the greetings text", () => {
    const { container } = render(<Greetings account="john" />); 
    expect(container.firstChild).toMatchSnapshot();
  });
});