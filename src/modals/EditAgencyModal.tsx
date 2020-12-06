import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { AgencyType } from "../../DataTypes";
import StyledFormikField from "../components/StyledFormikField";
import { theme } from "../components/Theme";
import { useAgency } from "../context/AgencyContext";
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

const EditAgencyModal: React.FC<{
  agencyProfile: AgencyType | null;
  getAgencyProfile: () => void;
}> = ({ agencyProfile, getAgencyProfile }) => {
  const { updateAgencyInfo } = useAgency();
  const { setActiveModal } = useModal();

  const agencySchema = Yup.object().shape({
    name: Yup.string().required("Agency name can not be empty"),
    description: Yup.string().required("Agency description can not be empty"),
    website: Yup.string(),
    contactFirstName: Yup.string(),
    contactLastName: Yup.string(),
    phone: Yup.string().required("Phone number can not be empty."),
    streetAddress: Yup.string(),
    city: Yup.string(),
    zip: Yup.string(),
    state: Yup.string(),
  });
  return (
    <Formik
      initialValues={{
        name: agencyProfile?.name || "",
        description: agencyProfile?.description || "",
        website: agencyProfile?.website || "",
        contactFirstName: agencyProfile?.contactFirstName || "",
        contactLastName: agencyProfile?.contactLastName || "",
        phone: agencyProfile?.phone || "",
        email: agencyProfile?.email || "",
        streetAddress: agencyProfile?.streetAddress || "",
        city: agencyProfile?.city || "",
        state: agencyProfile?.state || "",
        zip: agencyProfile?.zip || "",
      }}
      validationSchema={agencySchema}
      onSubmit={async (values) => {
        if (updateAgencyInfo && agencyProfile) {
          await updateAgencyInfo({
            agencyId: agencyProfile?.id,
            newData: { id: agencyProfile?.id, ...values },
          });
          getAgencyProfile();
          setActiveModal("");
        }
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <StyledFormikField name="name" label="Agency Name" />
          <StyledFormikField
            name="description"
            label="Description"
            type="textarea"
          />
          <StyledFormikField name="website" label="Website" />
          <StyledFormikField
            name="contactFirstName"
            label="Contact First name"
          />
          <StyledFormikField name="contactLastName" label="Contact Last name" />
          <StyledFormikField name="phone" label="Phone #" />
          <StyledFormikField name="email" label="Email" />
          <StyledFormikField name="streetAddress" label="Street Address" />
          <StyledFormikField name="city" label="City" />
          <StyledFormikField name="state" label="State" />
          <StyledFormikField name="zip" label="Zip Code" />
          <StyledButton type="submit">Submit</StyledButton>
        </Form>
      )}
    </Formik>
  );
};

export default EditAgencyModal;
