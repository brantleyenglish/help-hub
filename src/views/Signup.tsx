import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import ModalWrapper from "../components/ModalWrapper";
import { theme } from "../components/Theme";
import { useAuth } from "../context/AuthContext";
import { usePublicData } from "../context/PublicContext";
import { signup } from "../firebase/auth";
import UWHeader from "../images/uw_header.png";
import EmailNoticeModal from "../modals/EmailNoticeModal";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare } from "@fortawesome/pro-regular-svg-icons";

const StyledCheckbox = styled.button`
background: none;
border: none;
outline: none;
padding: 30px 0;
svg {
  padding-right: 10px;
  height: 20px !important;
  width: 20px !important;
}
label a {
  color: ${theme.colors.white} !important;
  text-decoration: underline;
}
`;
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
  color: ${theme.colors.red} !important;
  margin: 0 0 10px 0;
  p {
    color: ${theme.colors.red} !important;
  }
`;

const SignUp = () => {
  const [error, setError] = React.useState("");
  const { signupPassword } = usePublicData();
  const { loginUser } = useAuth();

  const [agreeToTerms, setAgreeToTerms] = React.useState<boolean>(false);

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
      <ModalWrapper modalId={"EmailNoticeModal"}>
        <EmailNoticeModal />
      </ModalWrapper>
      <Formik
        initialValues={{
          email: "",
          password: "",
          passcode: "",
        }}
        validationSchema={signupValidationSchema}
        onSubmit={async (values) => {
          if (agreeToTerms) {
            try {
              await signup({ email: values.email, password: values.password });
              if (loginUser) {
                await loginUser({
                  password: values.password,
                  email: values.email,
                });
              }
            } catch (e) {
              setError(e?.message);
            }
          } else {
            setError('Accepting Terms of Service is required to create an account')
          }
        }}
      >
        <Form>
          <FormFieldsWrapper>
            <h1>Sign Up</h1>


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
              <Field name="password" type="password" />
            </FieldWrapper>
            <ErrorWrapper>
              <ErrorMessage name="password" />
            </ErrorWrapper>
            <StyledCheckbox onClick={() => setAgreeToTerms(!agreeToTerms)}>
              {agreeToTerms ? (<FontAwesomeIcon icon={faCheckSquare} color={theme.colors.white} />) : (<FontAwesomeIcon icon={faSquare} color={theme.colors.white} />)}
              <label>By creating an account, you agree to the <a href="/terms-of-service.pdf">Hub Terms of Service and Privacy Policy</a>.</label>
            </StyledCheckbox>
            <ErrorWrapper>
              {error && <p>{error}</p>}
            </ErrorWrapper>
            <SubmitBtn type="submit">Submit</SubmitBtn>
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
