import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { ServiceType } from "../../DataTypes";
import CategoryDropdown from "../components/CategoryDropdown";
import StyledFormikField from "../components/StyledFormikField";
import { theme } from "../components/Theme";
import { useModal } from "../context/ModalContext";
import { usePublicData } from "../context/PublicContext";
import { updateService } from "../firebase/services";

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

const EditServiceModal: React.FC<{ service: ServiceType }> = ({ service }) => {
  const { setActiveModal } = useModal();
  const { refreshServices } = usePublicData();
  const [categories, setCategories] = React.useState<string[]>(
    service?.categories ? service?.categories : []
  );
  const serviceSchema = Yup.object().shape({
    name: Yup.string().required("You must give your service a name."),
    description: Yup.string()
      .required("You must give your service a description.")
      .max(500, "Keep the description under 500 characters"),
    contactFirstName: Yup.string(),
    contactLastName: Yup.string(),
    phone: Yup.string(),
    email: Yup.string(),
    streetAddress: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    zip: Yup.string(),
  });

  return (
    <>
      <StyledHeader>
        <h2>Edit a Service</h2>
        <p>Edit a service that your agency provides. </p>
        <p>This will be visible to those who view you agency's page.</p>
      </StyledHeader>
      <Formik
        initialValues={{
          name: service?.name || "",
          description: service?.description || "",
          contactFirstName: service?.contactFirstName || "",
          contactLastName: service?.contactLastName || "",
          phone: service?.phone || "",
          email: service?.email || "",
          streetAddress: service?.streetAddress || "",
          city: service?.city || "",
          state: service?.state || "",
          zip: service?.zip || "",
        }}
        validationSchema={serviceSchema}
        onSubmit={async (values) => {
          await updateService({
            data: { ...values, agencyId: service?.agencyId, categories },
            serviceId: service?.id,
          });
          if (refreshServices) {
            await refreshServices();
          }
          setActiveModal("");
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
            <CategoryDropdown
              setCategories={setCategories}
              defaultCategories={service?.categories || []}
            />
            <StyledButton type="submit">Submit</StyledButton>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default EditServiceModal;
