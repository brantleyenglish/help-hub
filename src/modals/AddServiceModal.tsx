import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import CategoryDropdown from "../components/CategoryDropdown";
import StyledFormikField from "../components/StyledFormikField";
import { theme } from "../components/Theme";
import { useModal } from "../context/ModalContext";
import { usePublicData } from "../context/PublicContext";
import { createService } from "../firebase/services";

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
  h2,
  p {
    margin: 0;
    padding: 0;
  }
`;

const AddServiceModal: React.FC<{ agencyId: string }> = ({ agencyId = "" }) => {
  const { setActiveModal } = useModal();
  const { refreshServices } = usePublicData();
  const [categories, setCategories] = React.useState<string[]>([]);
  const serviceSchema = Yup.object().shape({
    name: Yup.string().required("You must give your service a name."),
    description: Yup.string()
      .required("You must give your service a description.")
      .max(500, "Keep the description under 500 characters"),
    contactFirstName: Yup.string()
      .max(50, "Keep the name under 50 characters."),
    contactLastName: Yup.string()
      .max(50, "Keep the name under 50 characters."),
    phone: Yup.string()
      .max(11, "Please enter a valid phone number under 11 characters."),
    email: Yup.string()
      .max(50, "Keep email under 50 characters."),
    streetAddress: Yup.string()
      .max(250, "Keep the address under 250 characters."),
    city: Yup.string()
      .max(250, "Keep the city name under 250 characters."),
    state: Yup.string()
      .max(2, "Please enter a state abbreviation"),
    zip: Yup.string()
      .max(50, "Keep the zip code under 50 characters."),
  });

  return (
    <>
      <StyledHeader>
        <h2>Add a Service</h2>
        <p>Create a service that your agency provides. </p>
        <p>This will be visible to those who view you agency's page.</p>
      </StyledHeader>
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
        }}
        validationSchema={serviceSchema}
        onSubmit={async (values) => {
          await createService({ data: { ...values, agencyId, categories } });
          if (refreshServices) {
            await refreshServices();
          }
          setActiveModal("");
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <CategoryDropdown
              setCategories={setCategories}
              defaultCategories={[]}
            />
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

            <StyledButton type="submit">Submit</StyledButton>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default AddServiceModal;
