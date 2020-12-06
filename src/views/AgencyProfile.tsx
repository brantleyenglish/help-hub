import {
  faBrowser,
  faEnvelope,
  faMapMarkerAlt,
  faPencil,
  faPhone,
  faPlus,
  faUser,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAssistance } from "src/context/AssistanceContext";
import { usePublicData } from "src/context/PublicContext";
import AddBulletinModal from "src/modals/AddBulletinModal";
import styled from "styled-components";
import { AgencyType, AssistanceDataType, ServiceType } from "../../DataTypes";
import BulletinCard from "../components/cards/BulletinCard";
import ModalWrapper from "../components/ModalWrapper";
import ServiceCard from "../components/cards/ServiceCard";
import { theme } from "../components/Theme";
import { useAgency } from "../context/AgencyContext";
import { useModal } from "../context/ModalContext";
import { getAgency } from "../firebase/agencies";
import HHPlaceholder from "../images/helphubPlaceholder.png";
import AddServiceModal from "../modals/AddServiceModal";
import EditAgencyModal from "../modals/EditAgencyModal";

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
  max-width: 650px;
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
  cursor: pointer;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
  &:hover {
    background: ${theme?.colors?.white};
    color: ${theme.colors.blue};
  }
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
  img {
    object-fit: cover;
    border-radius: 999px;
    width: 70px;
    height: 70px;
    margin-right: 25px;
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

type AgencyProfileType = {
  match: any;
};

type ActiveTabType = "bulletinboard" | "services" | "timeline" | "reports";

const AgencyProfile = ({ match }: AgencyProfileType) => {
  const { agencyId } = match.params;
  // TO DO: Just show Agency services

  const { allServices, allPublicMessages } = usePublicData();
  const { agency, updateAgencyInfo, agencyMessages } = useAgency();
  const { assistanceData, setAssistanceAgencyId } = useAssistance();

  const [agencyProfile, setAgencyProfile] = React.useState<AgencyType | null>(
    null
  );

  const [activeTab, setActiveTab] = React.useState<ActiveTabType>(
    agency?.id === agencyId ? "bulletinboard" : "services"
  );

  const { setActiveModal } = useModal();

  const getAgencyProfile = async () => {
    if (setAssistanceAgencyId) {
      setAssistanceAgencyId(agencyId);
    }
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
      <ModalWrapper modalId="AgencyEdit">
        <EditAgencyModal
          agencyProfile={agencyProfile}
          getAgencyProfile={getAgencyProfile}
        />
      </ModalWrapper>
      {agencyProfile && (
        <AgencyBackground>
          <AgencyCardWrapper>
            <TitleWrapper>
              <img src={HHPlaceholder} />
              <h1>{agencyProfile?.name}</h1>

              {agency?.id === agencyId && (
                <EditButton
                  type="button"
                  onClick={() => setActiveModal("AgencyEdit")}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </EditButton>
              )}
            </TitleWrapper>

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
          </AgencyCardWrapper>
        </AgencyBackground>
      )}

      <ContentWrapper>
        {agency?.id === agencyId && (
          <NavigationWrapper>
            {/* BULLETIN BOARD */}
            <NavigationButton
              isActive={activeTab === "bulletinboard"}
              onClick={() => setActiveTab("bulletinboard")}
            >
              <ModalWrapper modalId="MessageCreate">
                <AddBulletinModal />
              </ModalWrapper>
              <p>BULLETIN BOARD</p>
              <AddBtnWrapper onClick={() => setActiveModal("MessageCreate")}>
                <FontAwesomeIcon icon={faPlus} />
              </AddBtnWrapper>
            </NavigationButton>

            {/* SERVICES */}
            <NavigationButton
              isActive={activeTab === "services"}
              onClick={() => setActiveTab("services")}
            >
              <ModalWrapper modalId="ServiceCreate">
                <AddServiceModal />
              </ModalWrapper>
              <p>SERVICES</p>
              <AddBtnWrapper onClick={() => setActiveModal("ServiceCreate")}>
                <FontAwesomeIcon icon={faPlus} />
              </AddBtnWrapper>
            </NavigationButton>

            {/* TIMELINE */}
            <NavigationButton
              isActive={activeTab === "timeline"}
              onClick={() => setActiveTab("timeline")}
            >
              <p>TIMELINE</p>
            </NavigationButton>

            {/* REPORTS */}
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
            {allServices
              ?.filter((service: ServiceType) => service?.agencyId === agencyId)
              ?.map((service: ServiceType) => (
                <ServiceCard service={service} key={service?.id} />
              ))}
          </>
        )}
        {activeTab === "bulletinboard" && (
          <>
            {agencyMessages?.map((message: any) => (
              <BulletinCard message={message} key={`${message?.id}-1`} />
            ))}
            {allPublicMessages?.map((message: any) => (
              <BulletinCard message={message} key={`${message?.id} - 2`} />
            ))}
          </>
        )}
        {activeTab === "timeline" && (
          <>
            {assistanceData?.map((assistance: AssistanceDataType) => (
              <MessageCard
                key={`${assistance?.client?.id}-${assistance?.service?.id}-${assistance?.agency?.id}`}
              >
                {`${assistance?.date} - ${assistance?.client?.clientFirstName} ${assistance?.client?.clientLastName} was offered ${assistance?.service?.name} by ${assistance?.agency?.name}`}
              </MessageCard>
            ))}
          </>
        )}
        {activeTab === "reports" && <p>Is reports</p>}
      </ContentWrapper>
    </AgencyProfileWrapper>
  );
};

export default AgencyProfile;
