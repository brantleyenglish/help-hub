import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { ClientType } from "../../DataTypes";
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

const EditClientModal: React.FC<{
  clientProfile: ClientType | null;
  getClientProfile: () => void;
}> = ({ clientProfile, getClientProfile }) => {
  const { updateClientInfo } = useClient();
  const { setActiveModal } = useModal();

  const clientSchema = Yup.object().shape({
    clientFirstName: Yup.string().required(
      "Client first name can not be empty."
    ),
    clientLastName: Yup.string().required("Client last name can not be empty."),
    dob: Yup.string().required("Please include client's date of birth"),
    phone: Yup.string(),
    email: Yup.string(),
    streetAddress: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    zip: Yup.string(),
    gender: Yup.string(),
    ethnicity: Yup.string(),
    county: Yup.string(),
    additionalNotes: Yup.string(),
  });
  return (
    <Formik
      initialValues={{
        clientFirstName: clientProfile?.clientFirstName || "",
        clientLastName: clientProfile?.clientLastName || "",
        dob: clientProfile?.dob || "",
        phone: clientProfile?.phone || "",
        email: clientProfile?.email || "",
        streetAddress: clientProfile?.streetAddress || "",
        city: clientProfile?.city || "",
        state: clientProfile?.state || "",
        zip: clientProfile?.zip || "",
        gender: clientProfile?.gender || "",
        ethnicity: clientProfile?.ethnicity || "",
        county: clientProfile?.county || "",
        additionalNotes: clientProfile?.additionalNotes || "",
      }}
      validationSchema={clientSchema}
      onSubmit={async (values) => {
        if (updateClientInfo && clientProfile?.id) {
          await updateClientInfo({
            clientId: clientProfile?.id,
            newData: { id: clientProfile?.id, ...values },
          });
          getClientProfile();
          setActiveModal("");
        }
      }}
    >
      {({ handleSubmit, setFieldValue, values }) => (
        <Form onSubmit={handleSubmit}>
          <StyledFormikField name="clientFirstName" label="Client First Name" />
          <StyledFormikField name="clientLastName" label="Client Last Name" />
          <FormikDateInput
            fieldName="dob"
            setFieldValue={setFieldValue}
            intialValue={values?.dob}
            label="Date of Birth"
          />
          <StyledFormikField name="phone" label="Phone #" />
          <StyledFormikField name="ethnicity" label="Ethnicity" />
          <StyledFormikField name="email" label="Email" />
          <StyledFormikField name="gender" label="Gender" />
          <StyledFormikField name="streetAddress" label="Street Address" />
          <StyledFormikField name="state" label="State" />
          <StyledFormikField name="county" label="County" />
          <StyledFormikField name="city" label="City" />
          <StyledFormikField name="zip" label="Zip Code" />
          <StyledButton type="submit">Submit</StyledButton>
        </Form>
      )}
    </Formik>
  );
};

export default EditClientModal;
