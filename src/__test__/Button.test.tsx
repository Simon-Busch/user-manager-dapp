import { render, screen } from '@testing-library/react';
import Button from '../components/UI/Button/Button';

describe("when rendered with an text prop", () => {
  it(" should paste it into the Button container", () => {
    render(<Button text="test button" />); 
    expect(
      screen.getByText(/test button/)
    ).toBeInTheDocument();
  });
});