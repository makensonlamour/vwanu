import React from "react";
import { render as rtlRender, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { act as testAct, create } from "react-test-renderer";
import { act as domAct } from "react-dom/test-utils";
import Login from "../Login";
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

//Testing Login form
//Test Dom Elements
describe("Test Dom Elements", () => {
  it("match snapshot", () => {
    let tree;
    domAct(() => {
      testAct(() => {
        tree = create(
          <QueryClientProvider client={queryClient}>
            <Router>
              <Login />
            </Router>
          </QueryClientProvider>
        );
      });
    });
    expect(tree).toMatchSnapshot();
  });
});

it("should have a login form", () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  const loginForm = screen.getByRole("form");
  expect(loginForm).toBeInTheDocument();
});

it("the login form should have an email input", () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  const emailInput = screen.getByPlaceholderText("Email");
  expect(emailInput).toBeInTheDocument();
});

it("the login form should have a password input", () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  const passwordInput = screen.getByPlaceholderText("Password");
  expect(passwordInput).toBeInTheDocument();
});

it("the login form should have a Login button", () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  const submitButton = screen.getByRole("button", { name: "Login" });
  expect(submitButton).toBeInTheDocument();
});

it("the submit button should have the text Login", () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  const submitButton = screen.getByRole("button", { name: "Login" });
  expect(submitButton).toHaveTextContent("Login");
});

it("the login page should have a register link", () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  const registerLink = screen.getByTestId("registerBtn");
  expect(registerLink).toHaveTextContent("Register");
});

//Test require fields
describe("Test require fields", () => {
  it("the email input should be a required fields", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("required");
  });

  it("the password input should be a required fields", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("required");
  });

  it("on initial render, the submit button is enabled", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const submitButton = screen.getByRole("button", { name: "Login" });
    expect(submitButton).not.toBeDisabled();
  });
});

//test login functionality
describe("Test Login Functionality", () => {
  it("should show error message on password and email when the form is submitted with empty fields", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });

    submitButton.click();
    await waitFor(() => expect(screen.queryByTestId("email-error-message")).toHaveTextContent("Email is a required field"));
    await waitFor(() => expect(screen.queryByTestId("password-error-message")).toHaveTextContent("Password is a required field"));
  });

  it("should show error message email when the form is submitted with empty email", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "Digicel.1" } });

    submitButton.click();
    await waitFor(() => expect(screen.queryByTestId("email-error-message")).toHaveTextContent("Email is a required field"));
  });

  it("should show error message password when the form is submitted with empty password", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "" } });

    submitButton.click();
    await waitFor(() => expect(screen.queryByTestId("password-error-message")).toHaveTextContent("Password is a required field"));
  });

  it("should show error message email if email missing @", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "testtest.com" } });
    fireEvent.change(passwordInput, { target: { value: "" } });

    submitButton.click();
    await waitFor(() => expect(screen.queryByTestId("email-error-message")).toHaveTextContent("Email must be a valid email"));
  });

  it("should show error message email if email missing .", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test@testcom" } });
    fireEvent.change(passwordInput, { target: { value: "" } });

    submitButton.click();
    await waitFor(() => expect(screen.queryByTestId("email-error-message")).toHaveTextContent("Email must be a valid email"));
  });

  it("should show error message password if password is least than 8 characters .", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "Digi" } });

    submitButton.click();
    await waitFor(() => expect(screen.queryByTestId("password-error-message")).toHaveTextContent("Password must be at least 8 characters"));
  });

  it("shouldn't display error", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "Digicel.1" } });

    submitButton.click();
    await waitFor(() => expect(screen.queryByTestId("password-error-message")).toBeNull());
    await waitFor(() => expect(screen.queryByTestId("email-error-message")).toBeNull());
  });
});
