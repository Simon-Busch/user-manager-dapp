import { render, screen } from "@testing-library/react";
import User from "../components/User/User";

describe("when feeded with various props", () => {
  it("should have a name in the User", () => {
    render(
      <User
        name="test name User"
        lastName="test lastName User"
        email="test email User"
        telephoneNumber={3232323}
        age={32}
        tags={"solidity"}
        ipfsHash={"dummy ifsHash"}
        personalLink={"www.google.com"}
        updateUser={() => {}}
        deleteUser={() => {}}
      />
    );
    expect(screen.getByText(/test name User/)).toBeInTheDocument();
  });
  it("should have a lastName in the User", () => {
    render(
      <User
        name="test name User"
        lastName="test lastName User"
        email="test email User"
        telephoneNumber={3232323}
        age={32}
        tags={"solidity"}
        ipfsHash={"dummy ifsHash"}
        personalLink={"www.google.com"}
        updateUser={() => {}}
        deleteUser={() => {}}
      />
    );
    expect(screen.getByText(/test lastName User/)).toBeInTheDocument();
  });
  it("should have a email in the User", () => {
    render(
      <User
        name="test name User"
        lastName="test lastName User"
        email="test email User"
        telephoneNumber={3232323}
        age={32}
        tags={"solidity"}
        ipfsHash={"dummy ifsHash"}
        personalLink={"www.google.com"}
        updateUser={() => {}}
        deleteUser={() => {}}
      />
    );
    expect(screen.getByText(/test email User/)).toBeInTheDocument();
  });
  it("should have a telephoneNumber in the User", () => {
    render(
      <User
        name="test name User"
        lastName="test lastName User"
        email="test email User"
        telephoneNumber={3232323}
        age={32}
        tags={"solidity"}
        ipfsHash={"dummy ifsHash"}
        personalLink={"www.google.com"}
        updateUser={() => {}}
        deleteUser={() => {}}
      />
    );
    expect(screen.getByText(/3232323/)).toBeInTheDocument();
  });
  it("should have an email in the User", () => {
    render(
      <User
        name="test name User"
        lastName="test lastName User"
        email="test email User"
        telephoneNumber={3232323}
        age={32}
        tags={"solidity"}
        ipfsHash={"dummy ifsHash"}
        personalLink={"www.google.com"}
        updateUser={() => {}}
        deleteUser={() => {}}
      />
    );
    expect(screen.getByText(/test email User/)).toBeInTheDocument();
  });
});
