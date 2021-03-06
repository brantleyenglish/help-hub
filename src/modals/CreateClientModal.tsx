import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { FormikDateInput } from "../components/DateInput";
import StyledFormikField from "../components/StyledFormikField";
import { theme } from "../components/Theme";
import { useClient } from "../context/ClientContext";
import { useModal } from "../context/ModalContext";

const StyledButton = styled.button`
  background: ${theme.colors.blue};
  color: ${theme.colors.white};
  border: none;
  outline: none;
  padding: 5px 10px;
  border-radius: 5px;
  &:hover {
    background: ${theme.colors.lightBlue};
    cursor: pointer;
  }
`;
const StyledHeader = styled.div`
  color: ${theme.colors.blue};
  h2 {
    color: ${theme.colors.red};
    font-size: 15px;
    padding: 0;
    margin: 2px;
  }
  h3 {
    color: ${theme.colors.red};
    font-size: 15px;
    padding: 0;
    margin: 5px;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CreateClientModal: React.FC<{ resetFilters: () => void }> = ({
  resetFilters,
}) => {
  const { createClient, getAllClientData } = useClient();
  const [error, setError] = React.useState("");
  const { setActiveModal } = useModal();

  const loginValidationSchema = Yup.object().shape({
    clientFirstName: Yup?.string()
      ?.required()
      .max(50, "Keep the name under 50 characters."),
    clientLastName: Yup?.string()
      ?.required()
      .max(50, "Keep the name under 50 characters."),
    dob: Yup?.string()?.required("Please enter client's date of birth")
      .min(1, "Please enter client's date of birth."),
    email: Yup?.string()
      .max(50, "Keep the email under 50 characters."),
    streetAddress: Yup?.string()
      .max(250, "Keep the address under 250 characters."),
    city: Yup?.string()
      .max(250, "Keep the city name under 250 characters."),
    state: Yup?.string()
      .max(2, "Please enter a state abbreviation"),
    zip: Yup?.string()
      .max(50, "Keep the zip code under 50 characters."),
    gender: Yup?.string(),
    ethnicity: Yup?.string(),
  });

  return (
    <Formik
      initialValues={{
        clientFirstName: "",
        clientLastName: "",
        dob: "",
        phone: "",
        email: "",
        streetAddress: "",
        city: "",
        state: "",
        zip: "",
        gender: "Other/Not Reported",
        ethnicity: "Other",
      }}
      validationSchema={loginValidationSchema}
      onSubmit={async (values) => {
        if (values && createClient && getAllClientData) {
          try {
            await createClient({ data: values });
            getAllClientData();
            resetFilters();
            setActiveModal("");
          } catch (e) {
            setError(e?.message);
          }
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <StyledHeader>
            <h1>Create Client</h1>
            <h2>
              I have received verbal or written consent from this client to
              collect their information.{" "}
            </h2>
            <div>
              Yes
              <input type="checkbox" />
            </div>
          </StyledHeader>

          <StyledFormikField name="clientFirstName" label="Client First Name (required)" />
          <StyledFormikField name="clientLastName" label="Client Last Name (required)" />
          <FormikDateInput
            fieldName="dob"
            setFieldValue={setFieldValue}
            intialValue={values?.dob}
            label="Date of Birth (required)"
          />
          <StyledFormikField name="phone" label="Phone #" />
          <StyledFormikField name="email" label="Email" />
          <StyledFormikField name="streetAddress" label="Street Address" />
          <StyledFormikField name="state" label="State" />
          <StyledFormikField name="city" label="City" />
          <StyledFormikField name="zip" label="Zip Code" />
          <StyledFormikField
            name="gender"
            label="Gender"
            type="select"
            options={[
              { value: "Not Reported", label: "Select Gender" },
              {
                value: "Male",
                label: "Male",
              },
              {
                value: "Female",
                label: "Female",
              },
              {
                value: "Transgender",
                label: "Transgender",
              },
              {
                value: "Other/Not Reported",
                label: "Other / Not Reported",
              },
            ]}
          />
          <StyledFormikField
            name="ethnicity"
            label="Ethnicity"
            type="select"
            options={[
              { value: "Not Reported", label: "Select Ethnicity" },
              {
                value: "White",
                label: "White / Caucasian",
              },
              {
                value: "Black/African American",
                label: "Black / African American",
              },
              {
                value: "Hispanic/Latinx",
                label: "Hispanic / Latinx",
              },
              {
                value: "Asian American",
                label: "Asian American",
              },
              {
                value: "American Indian/Alaskan Native",
                label: "American Indian / Alaskan Native",
              },
              {
                value: "Native Hawaiian/Pacific Islander",
                label: "Native Hawaiian / Pacific Islander",
              },
              {
                value: "Other",
                label: "Other",
              },
            ]}
          />

          <StyledButton type="submit">Submit</StyledButton>
          {error && <p>{error}</p>}
        </Form>
      )}
    </Formik>
  );
};

export default CreateClientModal;
