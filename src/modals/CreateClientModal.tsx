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
    gender: Yup?.string()?.required(),
    ethnicity: Yup?.string()?.required(),
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
        gender: "m",
        ethnicity: "white",
      }}
      validationSchema={loginValidationSchema}
      onSubmit={async (values) => {
        if (values && createClient && getAllClientData) {
          try {
            console.log(values);
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
          <h1>Create Client</h1>
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
                value: "m",
                label: "Male",
              },
              {
                value: "f",
                label: "Female",
              },
              {
                value: "other",
                label: "Other / N/A",
              },
            ]}
          />
          <StyledFormikField
            name="ethnicity"
            label="Ethnicity"
            type="select"
            options={[
              {
                value: "white",
                label: "White",
              },
              {
                value: "black",
                label: "Black / African American",
              },
              {
                value: "hispanic",
                label: "Hispanic / Latino",
              },
              {
                value: "asian",
                label: "Asian American",
              },
              {
                value: "native",
                label: "American Indian / Alaska Native",
              },
              {
                value: "pacific",
                label: "Native Hawaiian / Pacific Islander",
              },
              {
                value: "other",
                label: "Other / N/A",
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
