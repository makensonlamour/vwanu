import React from "react";
import { render as rtlRender, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { act as testAct, create } from "react-test-renderer";
import { act as domAct } from "react-dom/test-utils";
import ForgotPassword from "../ForgotPassword";
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

//Testing ForgotPassword form
//Test Dom Elements
describe("ForgotPassword Test Dom Elements", () => {
  it("match snapshot", () => {
    let tree;
    domAct(() => {
      testAct(() => {
        tree = create(
          <QueryClientProvider client={queryClient}>
            <Router>
              <ForgotPassword />
            </Router>
          </QueryClientProvider>
        );
      });
    });
    expect(tree).toMatchSnapshot();
  });
});

it("should have a form", () => {
  render(
    <Router>
      <ForgotPassword />
    </Router>
  );

  const ForgotPasswordForm = screen.getByRole("form");
  expect(ForgotPasswordForm).toBeInTheDocument();
});

it("should have an email input", () => {
  render(
    <Router>
      <ForgotPassword />
    </Router>
  );

  const emailInput = screen.getByPlaceholderText("Email");
  expect(emailInput).toBeInTheDocument();
});

it("should have a Reset Password button", () => {
  render(
    <Router>
      <ForgotPassword />
    </Router>
  );

  const submitButton = screen.getByRole("button", { name: "Reset Password" });
  expect(submitButton).toBeInTheDocument();
});

it("the submit button should have the text Reset Password", () => {
  render(
    <Router>
      <ForgotPassword />
    </Router>
  );

  const submitButton = screen.getByRole("button", { name: "Reset Password" });
  expect(submitButton).toHaveTextContent("Reset Password");
});

//Test require fields
describe("Test require fields", () => {
  it("the email input should be a required fields", () => {
    render(
      <Router>
        <ForgotPassword />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("required");
  });

  it("on initial render, the submit button is enabled", () => {
    render(
      <Router>
        <ForgotPassword />
      </Router>
    );

    const submitButton = screen.getByRole("button", { name: "Reset Password" });
    expect(submitButton).not.toBeDisabled();
  });
});

//test ForgotPassword functionality
describe("Test ForgotPassword Functionality", () => {
  it("should show error message email when the form is submitted with empty email", async () => {
    render(
      <Router>
        <ForgotPassword />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByRole("button", { name: "Reset Password" });

    fireEvent.change(emailInput, { target: { value: "" } });

    submitButton.click();
    await waitFor(() => expect(screen.queryByTestId("email-error-message")).toHaveTextContent("Email is a required field"));
  });

  it("should show error message email if email missing @", async () => {
    render(
      <Router>
        <ForgotPassword />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByRole("button", { name: "Reset Password" });

    fireEvent.change(emailInput, { target: { value: "testtest.com" } });

    submitButton.click();
    await waitFor(() => expect(screen.queryByTestId("email-error-message")).toHaveTextContent("Email must be a valid email"));
  });

  it("should show error message email if email missing .", async () => {
    render(
      <Router>
        <ForgotPassword />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByRole("button", { name: "Reset Password" });

    fireEvent.change(emailInput, { target: { value: "test@testcom" } });

    submitButton.click();
    await waitFor(() => expect(screen.queryByTestId("email-error-message")).toHaveTextContent("Email must be a valid email"));
  });

  it("shouldn't display error", async () => {
    render(
      <Router>
        <ForgotPassword />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByRole("button", { name: "Reset Password" });

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });

    submitButton.click();
    await waitFor(() => expect(screen.queryByTestId("email-error-message")).toBeNull());
  });
});
