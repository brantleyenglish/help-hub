import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import StyledFormikField from "../components/StyledFormikField";
import { theme } from "../components/Theme";
import { useAgency } from "../context/AgencyContext";
import { useModal } from "../context/ModalContext";
import { storage } from "../firebase/config";

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

const StyledFormikFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 10px;
  color: ${theme.colors.gray};
  label {
    color: ${theme.colors.lightBlue};
    text-align: left;
  }
  input,
  textarea,
  select {
    border-radius: 4px;
    padding: 5px;
    border: none;
    margin-top: 5px;
    background: ${theme.colors.grayLight};
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

type FormikAgencyType = {
  name: string;
  description: string;
  website: string;
  contactFirstName: string;
  contactLastName: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
};

const EditAgencyModal: React.FC<{
  agencyId: string;
}> = ({ agencyId }) => {
  const [profileUrl, setProfileUrl] = React.useState<string | undefined>(
    undefined
  );
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const [formikValues, setFormikValues] = React.useState<
    FormikAgencyType | undefined
  >(undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFile(e.target.files ? e.target.files[0] : undefined);
  };

  const handleFileUpload = async () => {
    if (file?.name) {
      const uploadTask = storage
        .ref(`/agencyImages/${agencyId}/${file.name}`)
        .put(file);
      uploadTask.on("state_changed", console.log, console.error, async () => {
        await storage
          .ref(`/agencyImages/${agencyId}`)
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setFile(undefined);
            setProfileUrl(url);
          });
      });
    }
  };

  const uploadAgencyEdits = async () => {
    if (updateAgencyInfo && agencyProfile?.id && formikValues && profileUrl) {
      await updateAgencyInfo({
        agencyId: agencyProfile?.id,
        newData: { id: agencyProfile?.id, ...formikValues, profileUrl },
      });
      if (setAgencyProfileId) {
        setAgencyProfileId({ agencyId });
      }
      setActiveModal("");
    }
  };

  React.useEffect(() => {
    uploadAgencyEdits();
  }, [profileUrl, formikValues]);

  const { updateAgencyInfo, agencyProfile, setAgencyProfileId } = useAgency();
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
    <>
      <StyledHeader>
        <>
          <h2>Edit Agency</h2>
          <p>Edit the information for {agencyProfile?.name}.</p>
        </>
      </StyledHeader>
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
          if (file) {
            setFormikValues(values);
            handleFileUpload();
          } else {
            if (updateAgencyInfo && agencyProfile) {
              await updateAgencyInfo({
                agencyId: agencyProfile?.id,
                newData: { id: agencyProfile?.id, ...values },
              });
              if (setAgencyProfileId) {
                setAgencyProfileId({ agencyId });
              }
              setActiveModal("");
            }
          }
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <StyledFormikField name="name" label="Agency Name" />
            <StyledFormikFieldWrapper>
              <label htmlFor="file">Upload Profile Image</label>
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
              />
            </StyledFormikFieldWrapper>
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
    </>
  );
};

export default EditAgencyModal;
