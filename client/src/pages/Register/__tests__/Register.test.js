import React from "react";
import { render as rtlRender, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { act as testAct, create } from "react-test-renderer";
import { act as domAct } from "react-dom/test-utils";
import Register from "../Register";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

afterEach(cleanup);

const render = (component) => rtlRender(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>);

//Testing Register form
//Test Dom Elements
describe("Register Test Dom Elements", () => {
  it("match snapshot", () => {
    let tree;
    domAct(() => {
      testAct(() => {
        tree = create(
          <QueryClientProvider client={queryClient}>
            <Router>
              <Register />
            </Router>
          </QueryClientProvider>
        );
      });
    });
    expect(tree).toMatchSnapshot();
  });
});

it("should have a Register form", () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  const registerForm = screen.getByRole("form");
  expect(registerForm).toBeInTheDocument();
});

it("should have an email input", () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  const emailInput = screen.getByPlaceholderText("Email");
  expect(emailInput).toBeInTheDocument();
});

it("have a password input", () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  const passwordInput = screen.getByPlaceholderText("Password");
  expect(passwordInput).toBeInTheDocument();
});

it("have a checkbox input", () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  const termCheckbox = screen.getAllByRole("checkbox")[0];
  expect(termCheckbox).toBeInTheDocument();
});

it("should have a Sign Up button", () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  const submitButton = screen.getByRole("button", { name: "Sign Up" });
  expect(submitButton).toBeInTheDocument();
});

it("the submit button should have the text Sign Up", () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  const submitButton = screen.getByRole("button", { name: "Sign Up" });
  expect(submitButton).toHaveTextContent("Sign Up");
});

it("should have a register link", () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  const registerLink = screen.getByTestId("loginBtn");
  expect(registerLink).toHaveTextContent("Sign In");
});

//Test require fields
describe("Test require fields", () => {
  it("the email input should be a required fields", () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("required");
  });

  it("the password input should be a required fields", () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("required");
  });

  it("on initial render, the submit button is enabled", () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const submitButton = screen.getByRole("button", { name: "Sign Up" });
    expect(submitButton).not.toBeDisabled();
  });
});

//test register functionality
describe("Test Register Functionality", () => {
  it("should show error message on password, email and Term of Use when the form is submitted with empty fields", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const termCheckbox = screen.getAllByRole("checkbox")[0];
    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.change(termCheckbox, { target: { value: false } });

    submitButton.click();
    await waitFor(() => expect(screen.queryByTestId("email-error-message")).toHaveTextContent("Email is a required field"));
    await waitFor(() => expect(screen.queryByTestId("password-error-message")).toHaveTextContent("Password is a required field"));
    await waitFor(() =>
      expect(screen.queryByTestId("termOfUse-error-message")).toHaveTextContent("You must accept the terms of use and the policy privacy")
    );
  });

  it("should show error message email when the form is submitted with empty email", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const termCheckbox = screen.getAllByRole("checkbox")[0];
    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "Digicel.1" } });
    termCheckbox.click();

    submitButton.click();
    await waitFor(() => expect(screen.queryByTestId("email-error-message")).toHaveTextContent("Email is a required field"));
  });

  it("should show error message password when the form is submitted with empty password", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const termCheckbox = screen.getAllByRole("checkbox")[0];
    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    termCheckbox.click();

    submitButton.click();
    await waitFor(() => expect(screen.queryByTestId("password-error-message")).toHaveTextContent("Password is a required field"));
  });

  it("should show error message Checkbox when the form is submitted when the checkbox is not check", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "Digicel.1" } });

    submitButton.click();
    await waitFor(() =>
      expect(screen.queryByTestId("termOfUse-error-message")).toHaveTextContent("You must accept the terms of use and the policy privacy")
    );
  });

  it("should show error message email if email missing @", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const termCheckbox = screen.getAllByRole("checkbox")[0];
    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(emailInput, { target: { value: "testtest.com" } });
    fireEvent.change(passwordInput, { target: { value: "Digicel.1" } });
    termCheckbox.click();

    submitButton.click();
    await waitFor(() => expect(screen.queryByTestId("email-error-message")).toHaveTextContent("Email must be a valid email"));
  });

  it("should show error message email if email missing .", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const termCheckbox = screen.getAllByRole("checkbox")[0];
    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(emailInput, { target: { value: "test@testcom" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    termCheckbox.click();

    submitButton.click();
    await waitFor(() => expect(screen.queryByTestId("email-error-message")).toHaveTextContent("Email must be a valid email"));
  });

  it("should show error message password if password is least than 8 characters .", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const termCheckbox = screen.getAllByRole("checkbox")[0];
    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "Digi" } });
    termCheckbox.click();

    submitButton.click();
    await waitFor(() => expect(screen.queryByTestId("password-error-message")).toHaveTextContent("Password must be at least 8 characters"));
  });

  it("shouldn't display error", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const termCheckbox = screen.getAllByRole("checkbox")[0];
    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "Digicel.1" } });
    termCheckbox.click();

    submitButton.click();
    await waitFor(() => expect(screen.queryByTestId("password-error-message")).toBeNull());
    await waitFor(() => expect(screen.queryByTestId("email-error-message")).toBeNull());
    await waitFor(() => expect(screen.queryByTestId("termOfUse-error-message")).toBeNull());
  });
});
