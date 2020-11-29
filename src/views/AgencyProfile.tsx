import {
  faBrowser,
  faEnvelope,
  faMapMarkerAlt,
  faPencil,
  faPhone,
  faPlus,
  faTimes,
  faUser,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { usePublicData } from "src/context/PublicContext";
import styled from "styled-components";
import * as Yup from "yup";
import { AgencyType } from "../../DataTypes";
import Modal from "../components/modal";
import ServiceCard from "../components/ServiceCard";
import { theme } from "../components/Theme";
import useModal from "../components/useModal";
import { useAgency } from "../context/AgencyContext";
import { getAgency } from "../firebase/agencies";

const AgencyProfileWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  background: ${theme.colors.white};
`;
const AgencyBackground = styled.div`
  width: 100%;
  background: ${theme.colors.blue};
  padding: 0;
`;
const AgencyCardWrapper = styled.div`
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
  flex-direction: row;
  align-items: baseline;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  & p {
    margin-top: 0;
    padding-top: 0;
  }
  & h2 {
    margin-bottom: 0;
    color: ${theme.colors.lightBlue};
  }
  & h3 {
    color: ${theme.colors.lightBlue};
    margin-bottom: 0;
    padding-bottom: 5px;
    font-size: 16px;
  }
`;
const FormLeftWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const FormRightWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 25px;
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
  & button {
    background: ${theme.colors.lightBlue};
  }
  outline: none;
  border: none;
  color: ${theme.colors.white};
  font-weight: bold;
  font-size: 15px;
  margin: 0 2px;
  &:hover {
    background: ${theme.colors.blue};
    cursor: pointer;
    & button {
      background-color: ${theme.colors.lightBlue};
    }
  }
  &:first-child {
    border-radius: 100px 0 0 100px;
  }
  &:last-child {
    border-radius: 0 100px 100px 0;
  }
`;
const ContentWrapper = styled.div`
  max-width: 650px;
  margin: auto;
  padding: 40px;
`;
const StyledFormikButton = styled.button`
  color: ${theme.colors.white};
  background-color: ${theme.colors.lightBlue};
  border: none;
  padding: 10px;
  border-radius: 50px;
  font-weight: bold;
  &:hover {
    color: ${theme.colors.lightBlue};
    background-color: ${theme.colors.white};
  }
`;
const AddBtnWrapper = styled.button`
  background-color: ${theme.colors.blue};
  color: ${theme.colors.white};
  padding: 5px 7px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: ${theme.colors.white} !important;
    color: ${theme.colors.blue} !important;
    cursor: pointer;
  }
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

type ActiveTabType = "bulletinboard" | "services" | "timeline" | "reports";

const AgencyProfile = ({ match }: AgencyProfileType) => {
  const { agencyId } = match.params;
  // TO DO: Just show Agency services
  const { allServices, allPublicMessages } = usePublicData();
  const { agency, updateAgencyInfo, agencyMessages } = useAgency();

  const [agencyProfile, setAgencyProfile] = React.useState<AgencyType | null>(
    null
  );

  const [editMode, setEditMode] = React.useState<boolean>(false);

  const [activeTab, setActiveTab] = React.useState<ActiveTabType>(
    "bulletinboard"
  );

  const [error, setError] = React.useState("");

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
    county: Yup.string().required("Select at least one county that you serve."),
  });

  const { isShowing, toggle } = useModal();

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
                    <EditButton
                      type="button"
                      onClick={() => setEditMode(!editMode)}
                    >
                      {editMode ? (
                        <FontAwesomeIcon icon={faTimes} />
                      ) : (
                        <FontAwesomeIcon icon={faPencil} />
                      )}
                    </EditButton>
                  )}
                </TitleWrapper>
                {editMode ? (
                  <FormFieldsWrapper>
                    <StyledFormikField name="name" label="Agency Name" />
                    <StyledFormikField name="description" label="Description" />
                    <StyledFormikField name="website" label="Website" />
                    <StyledFormikField
                      name="contactFirstName"
                      label="Contact First name"
                    />
                    <StyledFormikField
                      name="contactLastName"
                      label="Contact Last name"
                    />
                    <StyledFormikField name="phone" label="Phone #" />
                    <StyledFormikField name="email" label="Email" />
                    <StyledFormikField
                      name="streetAddress"
                      label="Street Address"
                    />
                    <StyledFormikField name="city" label="City" />
                    <StyledFormikField name="state" label="State" />
                    <StyledFormikField name="zip" label="Zip Code" />
                    {error && <p>{error}</p>}
                    <StyledFormikButton type="submit">
                      Submit
                    </StyledFormikButton>
                  </FormFieldsWrapper>
                ) : (
                  <FormContentWrapper>
                    <FormLeftWrapper>
                      <h2>DESCRIPTION:</h2>
                      <p>{agencyProfile?.description}</p>
                      <h3>
                        <FontAwesomeIcon icon={faBrowser} /> Website
                      </h3>
                      <p> {agencyProfile?.website}</p>
                    </FormLeftWrapper>
                    <FormRightWrapper>
                      <h2>CONTACT INFO:</h2>
                      <h3>
                        <FontAwesomeIcon icon={faUser} /> Contact
                      </h3>
                      <p>
                        {agencyProfile?.contactFirstName}{" "}
                        {agencyProfile?.contactLastName}
                      </p>
                      <h3>
                        <FontAwesomeIcon icon={faPhone} /> Phone
                      </h3>
                      <p>{agencyProfile?.phone}</p>
                      <h3>
                        <FontAwesomeIcon icon={faEnvelope} /> Email
                      </h3>
                      <p>{agencyProfile?.email}</p>
                      <h3>
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> Address
                      </h3>
                      <p>
                        {agencyProfile?.streetAddress}, {agencyProfile?.city},{" "}
                        {agencyProfile?.state} {agencyProfile?.zip}
                      </p>
                      <p>{agencyProfile?.counties?.join(", ")}</p>
                    </FormRightWrapper>
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
              isActive={activeTab === "bulletinboard"}
              onClick={() => setActiveTab("bulletinboard")}
            >
              <p>BULLETIN BOARD</p>
              <AddBtnWrapper onClick={toggle}>
                <FontAwesomeIcon icon={faPlus} />
              </AddBtnWrapper>
              <Modal isShowing={isShowing} hide={toggle} />
            </NavigationButton>
            <NavigationButton
              isActive={activeTab === "services"}
              onClick={() => setActiveTab("services")}
            >
              <p>SERVICES</p>
              <AddBtnWrapper>
                <FontAwesomeIcon icon={faPlus} />
              </AddBtnWrapper>
            </NavigationButton>

            <NavigationButton
              isActive={activeTab === "timeline"}
              onClick={() => setActiveTab("timeline")}
            >
              <p>TIMELINE</p>
            </NavigationButton>
            <NavigationButton
              isActive={activeTab === "reports"}
              onClick={() => setActiveTab("reports")}
            >
              <p>REPORTS</p>
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
        {activeTab === "bulletinboard" && (
          <>
            {agencyMessages?.map((message: any) => (
              <MessageCard key={message?.id}>{message?.message}</MessageCard>
            ))}
            {allPublicMessages?.map((message: any) => (
              <MessageCard key={message?.id}>{message?.message}</MessageCard>
            ))}
          </>
        )}
        {activeTab === "timeline" && <p>Is timeline</p>}
        {activeTab === "reports" && <p>Is reports</p>}
      </ContentWrapper>
    </AgencyProfileWrapper>
  );
};

export default AgencyProfile;
