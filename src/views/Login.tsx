import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const history = useHistory();
  const [error, setError] = React.useState("");
  const { user, loginUser } = useAuth();
  const [readyForRedirect, setReadyForRedirect] = React.useState<boolean>(
    false
  );

  React.useEffect(() => {
    if (user?.uid && history && readyForRedirect) {
      history.push(`/agencies/${user?.uid}`);
    }
  }, [user, history, readyForRedirect]);

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email().required("This email address is not valid"),
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
      }}
      validationSchema={loginValidationSchema}
      onSubmit={async (values) => {
        if (values?.email && values?.password && loginUser) {
          try {
            await loginUser({
              email: values?.email,
              password: values?.password,
            });
            setReadyForRedirect(true);
          } catch (e) {
            setError(e?.message);
          }
        }
      }}
    >
      <Form>
        <h1>Login</h1>
        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />
        <label htmlFor="password">Password</label>
        <Field name="password" type="text" />
        <ErrorMessage name="password" />
        <button type="submit">Submit</button>
        {error && <p>{error}</p>}
      </Form>
    </Formik>
  );
};

export default SignUp;
