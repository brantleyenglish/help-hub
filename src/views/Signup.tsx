import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { usePublicData } from "../context/PublicContext";
import { signup } from "../firebase/auth";

const SignUp = () => {
  const history = useHistory();
  const [error, setError] = React.useState("");
  const { signupPassword } = usePublicData();
  const { user } = useAuth();

  React.useEffect(() => {
    if (user?.uid && history) {
      history.push(`/agencies/${user?.uid}`);
    }
  }, [user, history]);

  const signupValidationSchema = Yup.object().shape({
    email: Yup.string().email().required("This email address is not valid"),
    passcode: Yup.string().matches(signupPassword, {
      message:
        "This passcode does not match. Please contact United Way West TN.",
    }),
    password: Yup.string()
      .required()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be 20 characters or less"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        passcode: "",
      }}
      validationSchema={signupValidationSchema}
      onSubmit={async (values) => {
        try {
          await signup({ email: values.email, password: values.password });
        } catch (e) {
          setError(e?.message);
        }
      }}
    >
      <Form>
        <h1>Sign Up to</h1>
        <p>Fill in the form below to create an account.</p>
        <label htmlFor="passcode">United Way Passcode</label>
        <Field name="passcode" id="passcode" />
        <ErrorMessage name="passcode" />
        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />
        <label htmlFor="password">Password</label>
        <Field name="password" type="text" />
        <ErrorMessage name="password" />
        <button type="submit">Submit</button>
        {error && <p>{error}</p>}
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Form>
    </Formik>
  );
};

export default SignUp;
