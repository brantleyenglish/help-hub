import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import CategoryDropdown from "../components/CategoryDropdown";
import StyledFormikField from "../components/StyledFormikField";
import { theme } from "../components/Theme";

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

const AddServiceModal: React.FC<{ agencyId: string }> = ({ agencyId = "" }) => {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const serviceSchema = Yup.object().shape({
    name: Yup.string().required("You must give your service a name."),
    description: Yup.string().required(
      "You must give your service a description."
    ),
    contactFirstName: Yup.string(),
    contactLastName: Yup.string(),
    phone: Yup.string(),
    email: Yup.string(),
    streetAddress: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    zip: Yup.string(),
    categories: Yup.string(),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        contactFirstName: "",
        contactLastName: "",
        phone: "",
        email: "",
        streetAddress: "",
        city: "",
        state: "",
        zip: "",
        categories: "",
      }}
      validationSchema={serviceSchema}
      onSubmit={async (values) => {
        console.log({ values, selectedCategories });
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <StyledFormikField name="name" label="Name of Service" />
          <StyledFormikField
            name="description"
            label="Description of Servivce"
            type="textarea"
          />
          <StyledFormikField
            name="contactFirstName"
            label="First Name of Contact for this Service"
          />
          <StyledFormikField
            name="contactLastName"
            label="Last Name of Contact for this Service"
          />
          <StyledFormikField name="phone" label="Phone Number" />
          <StyledFormikField name="email" label="Email" />
          <StyledFormikField name="streetAddress" label="Street Address" />
          <StyledFormikField name="city" label="City" />
          <StyledFormikField name="state" label="State" />
          <StyledFormikField name="zip" label="Zip Code" />
          <CategoryDropdown setCategories={setSelectedCategories} />
          <StyledButton type="submit">Submit</StyledButton>
        </Form>
      )}
    </Formik>
  );
};
export default AddServiceModal;
