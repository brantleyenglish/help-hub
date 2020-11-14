import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { ClientType } from "../../DataTypes";
import { theme } from "../components/Theme";
import { useClient } from "../context/ClientContext";

const ClientProfileWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  background: ${theme.colors.white};
`;

const ClientBackground = styled.div`
  width: 100%;
  background: ${theme.colors.red};
  padding: 80px 0;
`;

const ClientCardWrapper = styled.div`
  max-width: 650px;
  background: ${theme.colors.white};
  flex-direction: row;
  flex-wrap: wrap;
  border-radius: 2px;
  margin: auto;
  border-radius: 30px;
  padding: 40px;
`;

const EditButton = styled.button`
  background: ${theme?.colors?.red};
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
    background: ${theme?.colors?.redDark};
  }
`;

const StyledFormikFieldWraper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  /* width: 250px; */
  margin: 10px 0;
  color: ${theme.colors.gray};
  label {
    /* width: 100%; */
  }
  input {
    /* width: 100%; */
  }
`;

const FormFieldsWrapper = styled.div`
  width: 100%;
  flex-direction: row;
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
    p.isActive ? theme.colors.redDark : theme.colors.red};
  outline: none;
  border: none;
  color: ${theme.colors.white};
  font-style: bold;
  margin: 0 5px;
  &:hover {
    background: ${theme.colors.redDark};
    cursor: pointer;
  }
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
    clientFirstName: Yup.string().required("Client first name required"),
    clientLastName: Yup.string().required("Client last name required"),
    county: Yup.string(),
    additionalNotes: Yup.string(),
    phone: Yup.string(),
    address: Yup.string(),
    email: Yup.string(),
    dob: Yup.string().required("Please include client's date of birth"),
    ethnicity: Yup.string(),
    gender: Yup.string(),
  });

  // TO DO: Create Client Context
  // const getClientProfile = async () => {
  //   const clientData = await getClient({ clientId });
  //   if (clientData && clientData !== "DoesNotExist" && clientData !== "Error") {
  //     setClientProfile(clientData);
  //   }
  // };

  // // TO DO: Make equivilant for Timeline info and File info
  // // const { allServices } = usePublicData();

  // React.useEffect(() => {
  //   getClientProfile();
  // }, []);

  return (
    <ClientProfileWrapper>
      {clientProfile && (
        <>
          <Formik
            initialValues={{
              clientFirstName: clientProfile?.clientFirstName || "",
              clientLastName: clientProfile?.clientLastName || "",
              additionalNotes: clientProfile?.additionalNotes || "",
              phone: clientProfile?.phone || "",
              address: clientProfile?.address || "",
              email: clientProfile?.email || "",
              county: clientProfile?.county || "",
              dob: clientProfile?.dob || "",
              ethnicity: clientProfile?.ethnicity || "",
              gender: clientProfile?.gender || "",
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
            <ClientCardWrapper>
              <Form>
                <TitleWrapper>
                  <img src="/images/helphub-pattern-red.png" />
                  <div>
                    <h1>{clientProfile?.name}</h1>
                    <p>Update client contact info!</p>
                  </div>
                </TitleWrapper>
                <FormFieldsWrapper>
                  <StyledFormikField
                    name="clientFirstName"
                    label="Client First Name"
                  />
                  <StyledFormikField
                    name="clientLastName"
                    label="Client Last Name"
                  />
                  <StyledFormikField name="dob" label="Date of Birth" />
                  <StyledFormikField
                    name="additionalNotes"
                    label="Additional Notes"
                  />
                  <StyledFormikField name="phone" label="Phone #" />
                  <StyledFormikField name="address" label="Street Address" />
                  <StyledFormikField name="county" label="County" />
                  <StyledFormikField name="email" label="Email" />
                  <StyledFormikField name="ethnicity" label="Ethnicity" />
                  <StyledFormikField name="gender" label="Gender" />
                </FormFieldsWrapper>

                <button type="submit">Submit</button>
                {error && <p>{error}</p>}
              </Form>
            </ClientCardWrapper>
          </Formik>

          {/* {allServices &&
            allServices.map((service: any) => (
              <ServiceCard service={service} />
            ))} */}
        </>
      )}
    </ClientProfileWrapper>
  );
};

export default ClientProfile;
