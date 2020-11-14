import {
  faBrowser,
  faClock,
  faPencil,
  faPhone,
  faTimes,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { usePublicData } from "src/context/PublicContext";
import styled from "styled-components";
import * as Yup from "yup";
import { AgencyType } from "../../DataTypes";
import ServiceCard from "../components/ServiceList/ServiceCard";
import { theme } from "../components/Theme";
import { useAgency } from "../context/AgencyContext";
import { getAgency } from "../firebase/agencies";

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

const MessageCard = styled.div``;

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
  const { allServices, allPublicMessages } = usePublicData();
  const { agency, updateAgencyInfo, agencyMessages } = useAgency();

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
          }}
        >
          <AgencyBackground>
            <AgencyCardWrapper>
              <Form>
                <TitleWrapper>
                  <img src="/images/helphub-pattern-red.png" />

                  <h1>{agencyProfile?.name}</h1>
                  {agency?.id === agencyId && (
                    <EditButton onClick={() => setEditMode(!editMode)}>
                      {editMode ? (
                        <FontAwesomeIcon
                          icon={faTimes}
                          color={theme?.colors?.white}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faPencil}
                          color={theme?.colors?.white}
                        />
                      )}
                    </EditButton>
                  )}
                </TitleWrapper>
                {editMode ? (
                  <FormFieldsWrapper>
                    <StyledFormikField name="name" label="Agency Name" />
                    <StyledFormikField name="description" label="Description" />
                    <StyledFormikField
                      name="contactFirstName"
                      label="Contact First name"
                    />
                    <StyledFormikField
                      name="contactLastName"
                      label="Contact Last name"
                    />
                    <StyledFormikField name="city" label="City" />
                    <StyledFormikField
                      name="streetAddress"
                      label="Street Address"
                    />
                    <StyledFormikField name="phone" label="Phone #" />
                    <StyledFormikField name="website" label="Website" />
                    <StyledFormikField name="zip" label="Zip Code" />
                    {error && <p>{error}</p>}
                    <button type="submit">Submit</button>
                  </FormFieldsWrapper>
                ) : (
                  <FormContentWrapper>
                    <p>{agencyProfile?.description}</p>
                    <p>
                      <FontAwesomeIcon icon={faPhone} /> {agencyProfile?.phone}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faBrowser} />{" "}
                      {agencyProfile?.website}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faClock} /> {agencyProfile?.hours}
                    </p>
                    <p>{agencyProfile?.counties?.join(", ")}</p>
                    <p>{agencyProfile?.streetAddress}</p>
                    <p>{`${agencyProfile?.city}, TN ${agencyProfile?.zip}`}</p>
                  </FormContentWrapper>
                )}
              </Form>
            </AgencyCardWrapper>
          </AgencyBackground>
        </Formik>
      )}
      <ContentWrapper>
        {agency?.id === agencyId && (
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
        )}
        {activeTab === "services" && (
          <>
            {allServices?.map((service: any) => (
              <ServiceCard service={service} key={service?.id} />
            ))}
          </>
        )}
        {activeTab === "messages" && (
          <>
            {allPublicMessages?.map((message: any) => (
              <MessageCard key={message?.id}>{message?.message}</MessageCard>
            ))}
          </>
        )}
        {activeTab === "timeline" && <p>Is timeline</p>}
        {activeTab === "notes" && (
          <>
            {agencyMessages?.map((message: any) => (
              <MessageCard key={message?.id}>{message?.message}</MessageCard>
            ))}
          </>
        )}
      </ContentWrapper>
    </AgencyProfileWrapper>
  );
};

export default AgencyProfile;
