import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { theme } from "../components/Theme";
import { useAuth } from "../context/AuthContext";
import UWHeader from "../images/uw_header.png";

const StyledButton = styled.button`
  color: ${theme.colors.gray};
  border: none;
  outline: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 20px 20px 0px;
  &:hover {
    color: ${theme.colors.lightBlue};
    cursor: pointer;
  }
`;

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
  }
  & label {
    color: ${theme.colors.white};
  }
  p {
    color: ${theme.colors.white};
  }
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
  }
`;
const ErrorWrapper = styled.div`
  color: ${theme.colors.red};
  margin: 0 0 10px 0;
`;

const Login = () => {
  const [error, setError] = React.useState("");
  const [resetPasswordMode, setResetPasswordMode] = React.useState<boolean>(
    false
  );

  const { loginUser, resetPassword } = useAuth();

  const resetPasswordValidation = Yup.object().shape({
    email: Yup.string().email().required("Email address is not valid."),
  });

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email address is not valid."),
    password: Yup.string()
      .required()
      .min(6, "Password must be at least 6 characters.")
      .max(20, "Password must be 20 characters or less."),
  });

  if (resetPasswordMode) {
    return (
      <LoginWrapper>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={resetPasswordValidation}
          onSubmit={async (values) => {
            if (values?.email && resetPassword) {
              try {
                await resetPassword({
                  email: values?.email,
                  setError,
                });
              } catch (e) {
                setError(e?.message);
              }
            }
          }}
        >
          <Form>
            <FormFieldsWrapper>
              <h1>Login</h1>
              <label htmlFor="email">
                Email Address (we will send you a password reset link)
              </label>
              <FieldWrapper>
                <Field name="email" type="email" />
              </FieldWrapper>
              <ErrorWrapper>
                <ErrorMessage name="email" />
              </ErrorWrapper>
              <SubmitBtn type="submit">Send</SubmitBtn>
              {error && <p>{error}</p>}
            </FormFieldsWrapper>
            <StyledButton onClick={() => setResetPasswordMode(false)}>
              Go back
            </StyledButton>
          </Form>
        </Formik>
      </LoginWrapper>
    );
  }

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
            <FieldWrapper>
              <Field name="email" type="email" />
            </FieldWrapper>
            <ErrorWrapper>
              <ErrorMessage name="email" />
            </ErrorWrapper>
            <label htmlFor="password">Password</label>
            <FieldWrapper>
              <Field name="password" type="password" />
            </FieldWrapper>
            <ErrorWrapper>
              <ErrorMessage name="password" />
            </ErrorWrapper>
            <SubmitBtn type="submit">Submit</SubmitBtn>
            <StyledButton onClick={() => setResetPasswordMode(true)}>
              Forgot Password
            </StyledButton>
            {error && <p>{error}</p>}
          </FormFieldsWrapper>
        </Form>
      </Formik>
    </LoginWrapper>
  );
};

export default Login;
