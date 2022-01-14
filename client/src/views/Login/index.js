import * as Yup from "yup";

// Core components
import { Field, Form, Submit } from "../../components/form";

const ValidationSchema = Yup.object().shape({
  email: Yup.string().required().min(6).label("Email"),
  password: Yup.string().required().min(8).label("password"),
});

const LoginScreen = () => {
  return (
    <>
      <div className="">
        <div className="grid grid-cols-2 gap-4">
          <div className="justify-center">
            <div className="bg-yellow-400 rounded-br-[300px] h-screen">
              <div className="bg-blue-600 h-4/6 rounded-br-full rounded-bl-[5000px]">
                <p className="text-center text-white text-2xl py-5">
                  Logo VWANU
                </p>
                <p className="text-5xl text-yellow-500 font-bold py-10 text-center">
                  Welcome
                </p>
                <p className="text-white text-xl font-semibold text-center">
                  Share your Voice and Change
                </p>
                <p className="text-white text-xl font-semibold text-center">
                  The Haitian Community!
                </p>
              </div>
            </div>
          </div>

          <div className="place-items-center mx-20">
            <div className="place-content-end my-8">
              <p className="text-right">
                <span className="text-orange-500 text-lg font-semibold">
                  Not a member ?
                </span>{" "}
                <button className="btn btn-sm btn-primary px-8 ml-1 rounded-full text-base-200 normal-case">
                  Register
                </button>
              </p>
            </div>
            <Form
              validationSchema={ValidationSchema}
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={() => {
                alert("submitted");
              }}
              className="shadow-lg rounded-3xl"
            >
              <h1 className="card-title text-orange-500">Sign in to Vwanu</h1>
              <Field
                autoCapitalize="none"
                placeholder="Email"
                name="email"
                type="email"
                autoComplete="new-email"
                className="bg-blue-200 text-blue-500 font-semibold rounded-full px-6 input-primary border-none"
              />
              <Field
                autoCapitalize="none"
                autoCorrect="false"
                placeholder="Password"
                name="password"
                type="password"
                autoComplete="new-email"
                className="bg-blue-200 text-blue-500 font-semibold rounded-full px-6 input-primary border-none"
              />

              <Submit
                className="rounded-full text-base-200 text-md"
                title="Login"
              />
            </Form>
          </div>
        </div>
        {/*}
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
      {*/}
      </div>
    </>
  );
};

export default LoginScreen;
