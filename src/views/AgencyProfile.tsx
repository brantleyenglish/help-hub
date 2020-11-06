import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { AgencyType } from "../../DataTypes";
import { theme } from "../components/Theme";
import { useAgency } from "../context/AgencyContext";
import { getAgency } from "../firebase/agencies";

const AgencyProfileWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  background: ${theme.colors.white};
`;

const AgencyCardWrapper = styled.div`
  /* background: ${theme.colors.grayLight}; */
  flex-direction: row;
  flex-wrap: wrap;
  border-radius: 2px;
  max-width: 650px;
  margin: auto;
  border-radius: 30px;
  padding: 40px;
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

  img {
    object-fit: cover;
    border-radius: 999px;
    width: 100px;
    height: 100px;
    margin-right: 30px;
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

type AgencyProfileType = {
  match: any;
};

type ActiveTabType = "services" | "messages" | "timeline" | "notes";

const AgencyProfile = ({ match }: AgencyProfileType) => {
  const { agencyId } = match.params;
  const { agency, updateAgencyInfo } = useAgency();

  const [agencyProfile, setAgencyProfile] = React.useState<AgencyType | null>(
    null
  );

  const [activeTab, setActiveTab] = React.useState<ActiveTabType>("services");

  const [error, setError] = React.useState("");

  const agencySchema = Yup.object().shape({
    contactFirstName: Yup.string().required("Contact name required"),
    contactLastName: Yup.string().required("Contact name required"),
    city: Yup.string().required("City required"),
    description: Yup.string().required("Agency description required"),
    name: Yup.string().required("Agency name can not be empty"),
    phone: Yup.string().required("This email address is not valid"),
    streetAddress: Yup.string().required("This email address is not valid"),
    website: Yup.string().required("This email address is not valid"),
    zip: Yup.string().required("This email address is not valid"),
  });

  const getAgencyProfile = async () => {
    const agencyData = await getAgency({ agencyId });
    if (agencyData && agencyData !== "DoesNotExist" && agencyData !== "Error") {
      setAgencyProfile(agencyData);
    }
  };

  React.useEffect(() => {
    getAgencyProfile();
  }, []);

  return (
    <AgencyProfileWrapper>
      {agencyProfile && (
        <Formik
          initialValues={{
            contactFirstName: agencyProfile?.contactFirstName || "",
            contactLastName: agencyProfile?.contactLastName || "",
            city: agencyProfile?.city || "",
            description: agencyProfile?.description || "",
            name: agencyProfile?.name || "",
            phone: agencyProfile?.phone || "",
            streetAddress: agencyProfile?.streetAddress || "",
            website: agencyProfile?.website || "",
            zip: agencyProfile?.zip || "",
          }}
          validationSchema={agencySchema}
          onSubmit={async (values) => {
            if (updateAgencyInfo) {
              await updateAgencyInfo({
                agencyId: agencyProfile?.id,
                newData: { id: agencyProfile?.id, ...values },
              });
            }
            console.log("made it");
          }}
        >
          <AgencyCardWrapper>
            <Form>
              <TitleWrapper>
                <img src="/images/helphub-pattern-red.png" />
                <div>
                  <h1>{agencyProfile?.name}</h1>
                  <p>Update agency contact info!</p>
                </div>
              </TitleWrapper>
              <FormFieldsWrapper>
                <StyledFormikField name="name" label="Agency Name" />
                <StyledFormikField
                  name="contactFirstName"
                  label="Contact First name"
                />
                <StyledFormikField
                  name="contactLastName"
                  label="Contact Last name"
                />
                <StyledFormikField
                  name="contactFirstName"
                  label="Contact First name"
                />
                <StyledFormikField name="city" label="City" />
                <StyledFormikField name="description" label="Description" />
                <StyledFormikField name="phone" label="Phone #" />
                <StyledFormikField
                  name="streetAddress"
                  label="Street Address"
                />
                <StyledFormikField name="website" label="Website" />
                <StyledFormikField name="zip" label="Zip Code" />
              </FormFieldsWrapper>

              <button type="submit">Submit</button>
              {error && <p>{error}</p>}
            </Form>
          </AgencyCardWrapper>
        </Formik>
      )}
      <ContentWrapper>
        <NavigationWrapper>
          <NavigationButton
            isActive={activeTab === "services"}
            onClick={() => setActiveTab("services")}
          >
            <p>SERVICES</p>
          </NavigationButton>
          <NavigationButton
            isActive={activeTab === "messages"}
            onClick={() => setActiveTab("messages")}
          >
            <p>MESSAGES</p>
          </NavigationButton>
          <NavigationButton
            isActive={activeTab === "timeline"}
            onClick={() => setActiveTab("timeline")}
          >
            <p>TIMELINE</p>
          </NavigationButton>
          <NavigationButton
            isActive={activeTab === "notes"}
            onClick={() => setActiveTab("notes")}
          >
            <p>NOTES</p>
          </NavigationButton>
        </NavigationWrapper>
        {activeTab === "services" && <p>Is service</p>}
        {activeTab === "messages" && <p>Is messages</p>}
        {activeTab === "timeline" && <p>Is timeline</p>}
        {activeTab === "notes" && <p>Is notes</p>}
      </ContentWrapper>
    </AgencyProfileWrapper>
  );
};

export default AgencyProfile;
