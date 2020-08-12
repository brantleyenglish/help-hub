import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Link } from "react-router-dom";
import { signup } from "../firebase/auth";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string().email().required("This email address is not valid"),
  password: Yup.string()
    .required()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be 20 characters or less"),
});

const SignUp = () => {
  const [error, setError] = React.useState("");
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          await signup({ email: values.email, password: values.password });
        } catch (e) {
          setError(e);
        }
        console.log(values);
      }}
    >
      <Form>
        <h1>Sign Up to</h1>
        <p>Fill in the form below to create an account.</p>
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
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Form>
    </Formik>
  );
};

export default SignUp;
