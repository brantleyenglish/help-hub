import { faPencil, faTimes } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { AgencyType } from "../../DataTypes";
import ServiceCard from "../components/serviceList/serviceCard";
import { theme } from "../components/Theme";
import { useAgency } from "../context/AgencyContext";
import { getAgency } from "../firebase/agencies";
import { usePublicData } from "../context/PublicContext";


const AgencyProfileWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  background: ${theme.colors.white};
`;

const AgencyBackground = styled.div`
  width: 100%;
  background: ${theme.colors.red};
  padding: 80px 0;
`;

const AgencyCardWrapper = styled.div`
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

  const [editMode, setEditMode] = React.useState<boolean>(false);

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

  const { allServices } = usePublicData();

  React.useEffect(() => {
    getAgencyProfile();
  }, []);

  return (
    <AgencyProfileWrapper>
      {agencyProfile && (
        <>
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

          {allServices &&
            allServices.map((service: any) => (
              <ServiceCard service={service} />
            ))}
        </>
      )
      }

    </AgencyProfileWrapper >
  );
};


export default AgencyProfile;
