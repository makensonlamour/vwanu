import * as Yup from "yup";

// Core components
import { Field, Form, Submit } from "../../components/form";

const ValidationSchema = Yup.object().shape({
  email: Yup.string().required().min(6).label("Email"),
  password: Yup.string().required().min(8).label("password"),
});

const LoginScreen = () => {
  return (
    <div class="card w-1/2 shadow-lg mx-auto mt-20">
      <div class="card-body">
        {" "}
        <h1 className="card-title mx-auto">VWANU LOGIN</h1>
        <Form
          validationSchema={ValidationSchema}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={() => {
            alert("submitted");
          }}
        >
          <Field
            autoCapitalize="none"
            placeholder="Email"
            name="email"
            type="email"
            autoComplete="new-email"
          />
          <Field
            autoCapitalize="none"
            autoCorrect="false"
            placeholder="Password"
            name="password"
            type="password"
            autoComplete="new-email"
          />

          <Submit title="Login" />
        </Form>
      </div>
    </div>
  );
};

export default LoginScreen;
