import React from "react";
import AgencyInfo from "../components/agencyLoggedIn/agencyInfo";
import Messages from "../components/agencyLoggedIn/messages";
import ServiceMod from "../components/agencyLoggedIn/services";
import TimelineMod from "../components/clientProfile/clientAssistanceModal";
import TimelineToggle from "../components/agencyLoggedIn/timelineToggle.js";
import Agency from "../views/Agency";

import styled from "styled-components";

import { getAgency } from "../firebase/agencies";

import { useAgency } from "../context/AgencyContext";
import { useAuth } from "../context/AuthContext";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Link } from "react-router-dom";
import { signup } from "../firebase/auth";
import { theme } from "../components/Theme";

const AgencyProfileWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  background: ${theme.colors.white};
`;

const AgencyCardWrapper = styled.div`
  background: ${theme.colors.grayLight};
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
  border-radius: 999px;
  object-fit: fill;
  img {
    width: 100px;
  }
`;

const StyledFormikField = ({ name, label }) => {
  return (
    <StyledFormikFieldWraper>
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name} />
      <ErrorMessage name={name} />
    </StyledFormikFieldWraper>
  );
};

const AgencyProfile = ({ match }) => {
  const { agencyId } = match.params;
  const { agency, updateAgencyInfo } = useAgency();

  const [agencyProfile, setAgencyProfile] = React.useState(null);

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
    setAgencyProfile(agencyData);
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
            await updateAgencyInfo({
              agencyId: agencyProfile?.id,
              newData: values,
            });
            console.log("made it");
          }}
        >
          <AgencyCardWrapper>
            <Form>
              <TitleWrapper>
                <img src="/images/helphub-pattern-red.png" />
                <div>
                  <h1>{agency?.name}</h1>
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
    </AgencyProfileWrapper>
  );
};

export default AgencyProfile;
