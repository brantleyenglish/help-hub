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
h2{
  color: ${theme.colors.red};
  font-size: 15px;
  padding: 0;  
  margin: 2px;
};
h3 {
  color: ${theme.colors.red};
  font-size: 15px;
  padding: 0;  
  margin: 5px;
}
div{
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
    clientFirstName: Yup?.string()?.required(),
    clientLastName: Yup?.string()?.required(),
    dob: Yup?.string()?.required(),
    email: Yup?.string(),
    streetAddress: Yup?.string(),
    city: Yup?.string(),
    state: Yup?.string(),
    zip: Yup?.string(),
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
        gender: "Male",
        ethnicity: "White/Caucasian",
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
          <StyledHeader><h1>Create Client</h1>
            <h2>I have received verbal or written consent from this client to collect their information. </h2>
            <div>
              Yes<input type="checkbox" /></div>
          </StyledHeader>

          <StyledFormikField name="clientFirstName" label="Client First Name" />
          <StyledFormikField name="clientLastName" label="Client Last Name" />
          <FormikDateInput
            fieldName="dob"
            setFieldValue={setFieldValue}
            intialValue={values?.dob}
            label="Date of Birth"
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
              {
                value: "White/Caucasian",
                label: "White / Caucasian",
              },
              {
                value: "Black/African American",
                label: "Black / African American",
              },
              {
                value: "Hipanic/Latinx",
                label: "Hipanic / Latinx",
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
