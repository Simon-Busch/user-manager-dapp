import { render, screen } from '@testing-library/react';
import User from '../components/User/User';

describe("when feeded with various props", () => {
  it(" should have a name in the User", () => {
    render(<User name="test name User" />); 
    expect(
      screen.getByText(/test name User/)
    ).toBeInTheDocument();
  });
  it(" should have a lastName in the User", () => {
    render(<User lastName="test lastName User" />); 
    expect(
      screen.getByText(/test lastName User/)
    ).toBeInTheDocument();
  });
  it(" should have a email in the User", () => {
    render(<User email="test email User" />); 
    expect(
      screen.getByText(/test email User/)
    ).toBeInTheDocument();
  });
  it(" should have a telephoneNumber in the User", () => {
    render(<User telephoneNumber={3232323} />); 
    expect(
      screen.getByText(/3232323/)
    ).toBeInTheDocument();
  });
  it(" should have a age in the User", () => {
    render(<User age={32} />); 
    expect(
      screen.getByText(/32/)
    ).toBeInTheDocument();
  });
  it(" should have an email in the User", () => {
    render(<User email="test email User" />); 
    expect(
      screen.getByText(/test email User/)
    ).toBeInTheDocument();
  });
});