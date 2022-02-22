import { render as rtlRender, screen, cleanup, fireEvent } from "@testing-library/react";
//aimport "@testing-library/jest-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { store } from "../../../store";
import Login from "../Login";
import { Provider } from "react-redux";

afterEach(cleanup);

const render = (component) => rtlRender(<Provider store={store}>{component}</Provider>);

//Testing Login form
describe("LoginForm", () => {
  test("on initial render, the page should have a login form", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const loginForm = screen.getByRole("form");
    expect(loginForm).toBeInTheDocument();
  });

  test("the login form should have an email input", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeInTheDocument();
  });

  test("the email input should be a required fields", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("required");
  });

  test("the login form should have a password input", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();
  });

  test("the password input should be a required fields", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("required");
  });

  test("the login form should have a Login button", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const submitButton = screen.getByRole("button", { name: "Login" });
    expect(submitButton).toBeInTheDocument();
  });

  test("the submit button should have the text Login", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const submitButton = screen.getByRole("button", { name: "Login" });
    expect(submitButton).toHaveTextContent("Login");
  });

  test("on initial render, the submit button is enable", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const submitButton = screen.getByRole("button", { name: "Login" });
    expect(submitButton).not.toBeDisabled();
  });

  test("matches snapshot", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
