import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import { theme } from "../components/Theme";
import { usePublicData } from "../context/PublicContext";
import { signup } from "../firebase/auth";
import UWHeader from "../images/uw_header.png";

const SignupWrapper = styled.div`
  padding: 40px 0px 40px 0px;
  text-align: center;
  height: 500px;
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
    a {
      color: ${theme.colors.lightBlue};
    }
    a:hover {
      color: ${theme.colors.yellow};
    }
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

const SignUp = () => {
  const [error, setError] = React.useState("");
  const { signupPassword } = usePublicData();

  const signupValidationSchema = Yup.object().shape({
    email: Yup.string().email().required("This email address is not valid"),
    passcode: Yup.string().matches(signupPassword || /.*/, {
      message:
        "This passcode does not match. Please contact United Way West TN.",
    }),
    password: Yup.string()
      .required()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be 20 characters or less"),
  });

  return (
    <SignupWrapper>
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
          <FormFieldsWrapper>
            <h1>Sign Up</h1>
            <label htmlFor="passcode">United Way Passcode</label>
            <FieldWrapper>
              <Field name="passcode" id="passcode" />
            </FieldWrapper>
            <ErrorWrapper>
              <ErrorMessage name="passcode" />
            </ErrorWrapper>
            <label htmlFor="email">Email Address</label>
            <FieldWrapper>
              <Field name="email" type="email" />
            </FieldWrapper>
            <ErrorWrapper>
              <ErrorMessage name="email" />
            </ErrorWrapper>
            <label htmlFor="password">Password</label>
            <FieldWrapper>
              <Field name="password" type="text" />
            </FieldWrapper>
            <ErrorWrapper>
              <ErrorMessage name="password" />
            </ErrorWrapper>
            <SubmitBtn type="submit">Submit</SubmitBtn>
            {error && <p>{error}</p>}
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </FormFieldsWrapper>
        </Form>
      </Formik>
    </SignupWrapper>
  );
};

export default SignUp;
