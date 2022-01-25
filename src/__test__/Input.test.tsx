import { render, screen } from '@testing-library/react';
import Input from '../components/UI/Input/Input';

describe("when rendered with an label prop", () => {
  it(" should paste it into the label of the input", () => {
    render(<Input label={'label testing'} />); 
    expect(
      screen.getByText(/label testing/)
    ).toBeInTheDocument();
  });
});