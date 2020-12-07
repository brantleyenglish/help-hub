import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import { theme } from "../components/Theme";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import UWHeader from "../images/uw_header.png";

const LoginWrapper = styled.div`
  padding: 40px 0px 40px 0px;
  text-align: center;
  height: 400px;
  background-color: ${theme.colors.blue};
  background-image: url(${UWHeader});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  & h1 {
    color: ${theme.colors.white};
    font-size: 45px;
    text-transform: uppercase;
  };
  & label{
    color: ${theme.colors.white};
  };
`;
const FormFieldsWrapper = styled.div`
  flex-direction: column;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 10px 10px;
  & input {
    border-radius: 4px;
    padding: 5px;
    border: none;
    margin-top: 5px;
  }
`;
const SubmitBtn = styled.button`
color: ${theme.colors.white};
  background-color: ${theme.colors.lightBlue};
  border: none;
  padding: 10px;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  width: 80px;
  &:hover {
    color: ${theme.colors.lightBlue};
    background-color: ${theme.colors.white};
    `;
const ErrorWrapper = styled.div`
color: ${theme.colors.red};
margin: 0 0 10px 0;
`;

const Login = () => {
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
    email: Yup.string().email().required("Email address is not valid."),
    password: Yup.string()
      .required()
      .min(6, "Password must be at least 6 characters.")
      .max(20, "Password must be 20 characters or less."),
  });

  return (
    <LoginWrapper>
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
          <FormFieldsWrapper>
            <h1>Login</h1>
            <label htmlFor="email">Email Address</label>
            <FieldWrapper><Field name="email" type="email" /></FieldWrapper>
            <ErrorWrapper><ErrorMessage name="email" /></ErrorWrapper>
            <label htmlFor="password">Password</label>
            <FieldWrapper><Field name="password" type="text" /></FieldWrapper>
            <ErrorWrapper><ErrorMessage name="password" /></ErrorWrapper>
            <SubmitBtn type="submit">Submit</SubmitBtn>
            {error && <p>{error}</p>}
          </FormFieldsWrapper>
        </Form>
      </Formik>
    </LoginWrapper>
  );
};

export default Login;
