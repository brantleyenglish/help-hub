import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Link } from "react-router-dom";
import { login } from "../utils/auth";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("This email address is not valid"),
  password: Yup.string()
    .required("Password must be at least 5 characters")
    .min(5, "Password must be at least 5 characters")
    .max(20, "Password must be 20 characters or less"),
});

const Login = () => {
  const [error, setError] = React.useState("");
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          await login({ email: values.email, password: values.password });
        } catch (e) {
          setError(e);
        }
        console.log(values);
      }}
    >
      <Form>
        <h1>Login!</h1>
        <p>Fill in the form below to login.</p>
        <label htmlFor="Name">First Name</label>
        <Field name="name" type="text" />
        <ErrorMessage name="name" />
        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />
        <label htmlFor="password">Password</label>
        <Field name="password" type="text" />
        <ErrorMessage name="password" />
        <button type="submit">Submit</button>
        {error && <p>{error.message}</p>}
        <p>
          Need a new account? <Link to="/signup">Sign Up</Link>
        </p>
      </Form>
    </Formik>
  );
};

export default Login;
