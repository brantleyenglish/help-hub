import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styled from "styled-components";
import { theme } from "../components/Theme";
import * as Yup from "yup";
import { ClientType } from "../../DataTypes";
import { useClient } from "../context/ClientContext";
import { getClient } from "../firebase/clients";

import {
  faBrowser,
  faPencil,
  faPhone,
  faTimes,
  faEnvelope,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

{/* TO DO: MAKE THIS PAGE ONLY ACCESSIBLE FOR LOGGED IN PEOPLE*/ }


const ClientProfileWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  background: ${theme.colors.white};
`;
const ClientBackground = styled.div`
  width: 100%;
  background: ${theme.colors.blue};
  padding: 80px 0;
`;
const ClientCardWrapper = styled.div`
max-width: 900px;
// background: ${theme.colors.lightBlue};
color: ${theme.colors.white};
flex-direction: row;
flex-wrap: wrap;
border-radius: 2px;
margin: auto;
border-radius: 30px;
padding: 40px;
`;
const EditButton = styled.button`
  background: ${theme?.colors?.lightBlue};
  color: ${theme.colors.white};
  outline: none;
  border: none;
  padding: 5px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    background: ${theme?.colors?.white};
    color: ${theme.colors.blue};
  }
`;
const StyledFormikFieldWraper = styled.div`
display: flex;
flex-direction: column;
width: 300px;
/* width: 250px; */
margin: 10px 10px;
color: ${theme.colors.gray};
label {
  color: ${theme.colors.lightBlue};
}
input {
  width: 100%;
  border-radius: 4px;
  padding: 5px;
  border: none;
  margin-top: 5px;
}
`;
const FormFieldsWrapper = styled.div`
width: 100%;
flex-direction: row;
flex-wrap: wrap;
display: flex;
justify-content: space-between;
`;
const FormContentWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  img {
    object-fit: cover;
    border-radius: 999px;
    width: 100px;
    height: 100px;
    margin-right: 50px;
  }
`;
const NavigationWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const NavigationButton = styled.button<{ isActive: boolean }>`
  padding: 3px 20px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(p: any) =>
    p.isActive ? theme.colors.blue : theme.colors.lightBlue};
  outline: none;
  border: none;
  color: ${theme.colors.white};
  font-weight: bold;
  font-size: 15px;
  margin: 0 2px;
  &:hover {
    background: ${theme.colors.blue};
    cursor: pointer;
  }
  &:first-child{
    border-radius: 100px 0 0 100px;
  };
  &:last-child{
    border-radius: 0 100px 100px 0;
  };
`;
const ContentWrapper = styled.div`
  max-width: 650px;
  margin: auto;
  padding: 40px;
`;

type StyledFormikFieldType = {
  name: string;
  label: string;
};

const StyledFormikField = ({ name, label }: StyledFormikFieldType) => {

  return (
    <StyledFormikFieldWraper>
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name} />
      <ErrorMessage name={name} />
    </StyledFormikFieldWraper>
  );
};

type ClientProfileType = {
  match: any;
};

type ActiveTabType = "timeline" | "files";

const ClientProfile = ({ match }: ClientProfileType) => {
  const { clientId } = match.params;
  const { client, updateClientInfo } = useClient();

  const [clientProfile, setClientProfile] = React.useState<ClientType | null>(
    null
  );

  const [editMode, setEditMode] = React.useState<boolean>(false);

  const [activeTab, setActiveTab] = React.useState<ActiveTabType>("timeline");

  const [error, setError] = React.useState("");

  const clientSchema = Yup.object().shape({
    clientFirstName: Yup.string().required("Client first name can not be empty."),
    clientLastName: Yup.string().required("Client last name can not be empty."),
    dob: Yup.string().required("Please include client's date of birth"),
    phone: Yup.string(),
    email: Yup.string(),
    address: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    zip: Yup.string(),
    gender: Yup.string(),
    ethnicity: Yup.string(),
    county: Yup.string(),
    additionalNotes: Yup.string(),
  });

  const getClientProfile = async () => {
    const clientData = await getClient({ clientId });
    if (clientData && clientData !== "DoesNotExist") {
      setClientProfile(clientData);
    }
  };

  React.useEffect(() => {
    getClientProfile();
  }, []);

  return (
    <ClientProfileWrapper>
      {clientProfile && (
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
            }
          }}
        >
          <ClientBackground>
            <ClientCardWrapper>
              <Form>
                <TitleWrapper>
                  <h1>{clientProfile?.clientFirstName}</h1>
                  <p>Update client contactinfo!</p>
                  <EditButton type="button" onClick={() => setEditMode(!editMode)}>
                    {editMode ? (
                      <FontAwesomeIcon icon={faTimes} />
                    ) : (
                        <FontAwesomeIcon icon={faPencil} />
                      )}
                  </EditButton>
                </TitleWrapper>
                {editMode ? (
                  <FormFieldsWrapper>
                    <StyledFormikField name="clientFirstName" label="Client First Name" />
                    <StyledFormikField name="clientLastName" label="Client Last Name" />
                    <StyledFormikField name="dob" label="Date of Birth" />
                    <StyledFormikField name="phone" label="Phone #" />
                    <StyledFormikField name="email" label="Email" />
                    <StyledFormikField name="streetAddress" label="Street Address" />
                    <StyledFormikField name="city" label="City" />
                    <StyledFormikField name="state" label="State" />
                    <StyledFormikField name="zip" label="Zip Code" />
                    <StyledFormikField name="gender" label="Gender" />
                    <StyledFormikField name="ethnicity" label="Ethnicity" />
                    <StyledFormikField name="county" label="County" />
                    <StyledFormikField
                      name="additionalNotes"
                      label="Additional Notes"
                    />
                  </FormFieldsWrapper>
                ) : (
                    <FormContentWrapper>
                      <p>
                        <FontAwesomeIcon icon={faBrowser} />{" "}
                        {clientProfile?.dob}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faPhone} /> Phone: {clientProfile?.phone}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faEnvelope} /> Email: {clientProfile?.email}
                      </p>
                      <p>{clientProfile?.streetAddress},</p>
                      <p>{clientProfile?.city}, {clientProfile?.state}  {clientProfile?.zip}</p>
                      <p>{clientProfile?.gender}</p>
                      <p>{clientProfile?.ethnicity}</p>
                      <p>{clientProfile?.county}</p>
                      <p>{clientProfile?.additionalNotes}</p>
                    </FormContentWrapper>
                  )}
                <button type="submit">Submit</button>
                {error && <p>{error}</p>}
              </Form>
            </ClientCardWrapper>
          </ClientBackground>
        </Formik>
      )}
      <ContentWrapper>
        <NavigationWrapper>
          <NavigationButton
            isActive={activeTab === "timeline"}
            onClick={() => setActiveTab("timeline")}
          >
            <p>TIMELINE</p>
          </NavigationButton>
          <NavigationButton
            isActive={activeTab === "files"}
            onClick={() => setActiveTab("files")}
          >
            <p>FILES</p>
          </NavigationButton>
        </NavigationWrapper>

        {activeTab === "timeline" && <p>This is the timeline.</p>}
        {activeTab === "files" && <p>These are the files</p>}

      </ContentWrapper>

    </ClientProfileWrapper>
  );
};

export default ClientProfile;
