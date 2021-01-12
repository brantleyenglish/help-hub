import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { FormikDateInput } from "../components/DateInput";
import StyledFormikField from "../components/StyledFormikField";
import { theme } from "../components/Theme";
import { useClient } from "../context/ClientContext";
import { useModal } from "../context/ModalContext";
import { usePublicData } from "../context/PublicContext";

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

const EditClientModal: React.FC<{
  clientId: string;
}> = ({ clientId }) => {
  const { updateClientInfo, getClientProfile, clientProfile } = useClient();
  const { setActiveModal } = useModal();
  const { counties } = usePublicData();

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
    county: Yup.string().required("County is required"),
  });
  return (
    <>
      <StyledHeader>
        <>
          <h2>Edit Assistance</h2>
          <p>
            Edit the information for {clientProfile?.clientFirstName}{" "}
            {clientProfile?.clientLastName}.
          </p>
        </>
      </StyledHeader>
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
          gender: clientProfile?.gender || "Male",
          ethnicity: clientProfile?.ethnicity || "White",
          county: clientProfile?.county || "",
        }}
        validationSchema={clientSchema}
        onSubmit={async (values) => {
          if (updateClientInfo && clientProfile?.id) {
            await updateClientInfo({
              clientId: clientProfile?.id,
              newData: { id: clientProfile?.id, ...values },
            });
            if (getClientProfile) {
              getClientProfile({ clientId });
            }
            setActiveModal("");
          }
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <Form onSubmit={handleSubmit}>
            <StyledFormikField
              name="clientFirstName"
              label="Client First Name"
            />
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
                  value: "Not Reported",
                  label: "Not Reported",
                },
              ]}
            />
            <StyledFormikField
              name="ethnicity"
              label="Ethnicity"
              type="select"
              options={[
                {
                  value: "White",
                  label: "White",
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
                  value: "Other",
                  label: "Other",
                },
                {
                  value: "Not Reported",
                  label: "Not Reported",
                },
              ]}
            />
            <StyledFormikField
              name="county"
              label="County"
              type="select"
              options={
                counties
                  ? [
                      ...counties?.map((county: string) => {
                        return {
                          value: county,
                          label: county,
                        };
                      }),
                      {
                        value: "N/A",
                        label: "N/A",
                      },
                    ]
                  : [
                      {
                        value: "N/A",
                        label: "N/A",
                      },
                    ]
              }
            />
            <StyledButton type="submit">Submit</StyledButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditClientModal;
