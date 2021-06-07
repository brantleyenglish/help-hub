import {
  faBrowser,
  faEnvelope,
  faMap,
  faMapMarkerAlt,
  faPencil,
  faPhone,
  faPlus,
  faTag,
  faTrash,
  faUser,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAssistance } from "src/context/AssistanceContext";
import { usePublicData } from "src/context/PublicContext";
import AddBulletinModal from "src/modals/AddBulletinModal";
import styled from "styled-components";
import {
  MessageType,
  ServiceType,
  SingleAssistanceType,
} from "../../DataTypes";
import BulletinCard from "../components/cards/BulletinCard";
import ServiceCard from "../components/cards/ServiceCard";
import TimelineAssistanceCard from "../components/cards/TimelineAssistanceCard";
import ModalWrapper from "../components/ModalWrapper";
import Reports from "../components/Reports";
import { theme } from "../components/Theme";
import { useAgency } from "../context/AgencyContext";
import { useModal } from "../context/ModalContext";
import HHPlaceholder from "../images/helphubPlaceholder.png";
import AddServiceModal from "../modals/AddServiceModal";
import DeleteAgencyModal from "../modals/DeleteAgencyModal";
import EditAgencyModal from "../modals/EditAgencyModal";
import sortByDate from "../utils/sortByDate";

const AgencyProfileWrapper = styled.div`
  width: 100%;
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
  margin: auto;
  border-radius: 30px;
  padding: 40px 30px 50px 30px;
`;
const EditButton = styled.button<{ rightValue?: string }>`
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
  border-radius: 2px;
  top: 10px;
  right: ${(p) => (p?.rightValue ? p?.rightValue : "10px")};
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
  & a {
    color: ${theme.colors.white};
    margin-top: 0;
    padding-top: 0;
    :hover {
      color: ${theme.colors.lightBlue};
    }
  }
  & p {
    color: ${theme.colors.white};
    margin: 0;
    padding: 0;
  }
  & h2 {
    margin-bottom: 0;
    color: ${theme.colors.lightBlue};
  }
  & h3 {
    color: ${theme.colors.yellow};
    margin: 20px 0 0 0;
    padding-bottom: 5px;
    font-size: 16px;
  }
`;
const FormLeftWrapper = styled.div`
  max-width: 325px;
  display: flex;
  flex-direction: column;
`;
const FormRightWrapper = styled.div`
  max-width: 325px;
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
const ContentWrapper = styled.div`
  margin: auto;
  padding: 40px;
`;
const NavigationWrapper = styled.div`
  max-width: 650px;
  margin: auto;
  display: flex;
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
  font-size: 14px;
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
  @media (max-width: 767px) {
    padding: 3px 15px;
    font-size: 11px;
  }
`;

const BulletinWrapper = styled.div`
  margin: auto;
  max-width: 650px;
`;
const TimelineWrapper = styled.div`
  margin: auto;
  max-width: 650px;
`;
const ReportsWrapper = styled.div`
  margin: auto;
  max-width: 650px;
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
const ServiceCardWrapper = styled.div`
  flex-direction: row;
  padding: 20px;
  display: flex;
`;
const ServiceCardWrapperWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const MessageCard = styled.div``;

type AgencyProfileType = {
  match: any;
};

type ActiveTabType = "bulletinboard" | "services" | "timeline" | "reports";

const AgencyProfile = ({ match }: AgencyProfileType) => {
  const { agencyId }: { agencyId: string } = match.params;
  const {
    setAgencyProfileId,
    agencyProfile,
    agency,
    agencyMessages,
  } = useAgency();
  // TO DO: Just show Agency services

  const { allServices, allPublicMessages } = usePublicData();
  const { agencyAssistance, setAssistanceAgencyId } = useAssistance();

  const [activeTab, setActiveTab] = React.useState<ActiveTabType>(
    agency?.id === agencyId ? "bulletinboard" : "services"
  );

  const { setActiveModal } = useModal();

  React.useEffect(() => {
    if (match?.path === "/agencies/:agencyId" && setAgencyProfileId) {
      setAgencyProfileId({ agencyId });
      if (agencyId && setAssistanceAgencyId) {
        setAssistanceAgencyId(agencyId);
      }
    }
  }, [match, setAgencyProfileId]);

  const messageList = React.useMemo(() => {
    const mergedMessages =
      agencyMessages && allPublicMessages
        ? [
            ...agencyMessages?.filter(
              (message: MessageType) => message?.isPrivate
            ),
            ...allPublicMessages,
          ]
        : [];
    return mergedMessages?.sort(sortByDate);
  }, [agencyMessages, allPublicMessages, match]);

  const sortByName = (a: ServiceType, b: ServiceType) => {
    if (a?.name && b?.name) {
      if (a?.name < b?.name) {
        return -1;
      }
      if (a?.name > b?.name) {
        return 1;
      }
    }
    return 0;
  };

  return (
    <AgencyProfileWrapper>
      <ModalWrapper modalId="AgencyDelete">
        <DeleteAgencyModal agencyId={agencyId} />
      </ModalWrapper>
      <ModalWrapper modalId="AgencyEdit">
        <EditAgencyModal agencyId={agencyId} />
      </ModalWrapper>
      {agencyProfile && (
        <AgencyBackground>
          <AgencyCardWrapper>
            <TitleWrapper>
              <img
                src={
                  agencyProfile?.profileUrl
                    ? agencyProfile?.profileUrl
                    : HHPlaceholder
                }
              />
              {agencyProfile?.name && <h1>{agencyProfile?.name}</h1>}
              {!agencyProfile?.name && (
                <>
                  <h1>Welcome to Your Agency Profile</h1>
                </>
              )}
              {agency?.admin && (
                <EditButton
                  rightValue="50px"
                  type="button"
                  onClick={() => setActiveModal("AgencyDelete")}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </EditButton>
              )}
              {(agency?.admin || agency?.id === agencyId) && (
                <EditButton
                  type="button"
                  onClick={() => setActiveModal("AgencyEdit")}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </EditButton>
              )}
            </TitleWrapper>

            <FormContentWrapper>
              {!agencyProfile?.name && (
                <>
                  <p style={{ paddingTop: "10px" }}>
                    Click the edit button in the upper right corner to edit your
                    agency info.{" "}
                  </p>
                </>
              )}
              <FormLeftWrapper>
                {agencyProfile?.description && (
                  <>
                    <h3>
                      <FontAwesomeIcon icon={faTag} /> Description
                    </h3>
                    <p style={{ paddingRight: "10px" }}>
                      {agencyProfile?.description}
                    </p>
                  </>
                )}
                {agencyProfile?.website && (
                  <>
                    <h3>
                      <FontAwesomeIcon icon={faBrowser} /> Website
                    </h3>
                    <a
                      href={
                        "http://" +
                        agencyProfile?.website
                          .replace("https://", "")
                          .replace("http://", "")
                      }
                    >
                      {" "}
                      {agencyProfile?.website}
                    </a>
                  </>
                )}
              </FormLeftWrapper>
              <FormRightWrapper>
                {agencyProfile?.contactFirstName && (
                  <>
                    <h3>
                      <FontAwesomeIcon icon={faUser} /> Contact
                    </h3>
                    <p>
                      {agencyProfile?.contactFirstName}{" "}
                      {agencyProfile?.contactLastName}
                    </p>
                  </>
                )}
                {agencyProfile?.phone && (
                  <>
                    <h3>
                      <FontAwesomeIcon icon={faPhone} /> Phone
                    </h3>
                    <a href={"tel:" + agencyProfile?.phone}>
                      {agencyProfile?.phone}
                    </a>
                  </>
                )}
                {agencyProfile?.email && (
                  <>
                    <h3>
                      <FontAwesomeIcon icon={faEnvelope} /> Email
                    </h3>
                    <a href={"mailto:" + agencyProfile?.email}>
                      {agencyProfile?.email}
                    </a>
                  </>
                )}
                {(agency?.streetAddress ||
                  agencyProfile?.city ||
                  agencyProfile?.state ||
                  agencyProfile?.zip) && (
                  <>
                    <h3>
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> Address
                    </h3>
                    <a
                      href={
                        "http://maps.google.com/?q=" +
                        agencyProfile?.streetAddress +
                        "," +
                        agencyProfile?.city +
                        "," +
                        agencyProfile?.state +
                        "," +
                        agencyProfile?.zip
                      }
                    >
                      {agencyProfile?.streetAddress}, {agencyProfile?.city},{" "}
                      {agencyProfile?.state} {agencyProfile?.zip}
                    </a>
                  </>
                )}
                {agencyProfile?.counties && (
                  <>
                    <h3>
                      <FontAwesomeIcon icon={faMap} /> Active Counties
                    </h3>
                    <p>{agencyProfile?.counties?.join(", ")}</p>
                  </>
                )}
              </FormRightWrapper>
            </FormContentWrapper>
          </AgencyCardWrapper>
        </AgencyBackground>
      )}

      <ContentWrapper>
        {(agency?.id === agencyId || agency?.admin) && (
          <NavigationWrapper>
            {/* BULLETIN BOARD */}
            <NavigationButton
              isActive={activeTab === "bulletinboard"}
              onClick={() => setActiveTab("bulletinboard")}
            >
              <ModalWrapper modalId="MessageCreate">
                <AddBulletinModal agencyId={agencyId} />
              </ModalWrapper>
              <p>BULLETIN BOARD</p>
              {agency?.id === agencyId && (
                <AddBtnWrapper onClick={() => setActiveModal("MessageCreate")}>
                  <FontAwesomeIcon icon={faPlus} />
                </AddBtnWrapper>
              )}
            </NavigationButton>

            {/* SERVICES */}
            <NavigationButton
              isActive={activeTab === "services"}
              onClick={() => setActiveTab("services")}
            >
              <ModalWrapper modalId="ServiceCreate">
                <AddServiceModal agencyId={agencyId} />
              </ModalWrapper>
              <p>SERVICES</p>
              {agency?.id === agencyId && (
                <AddBtnWrapper onClick={() => setActiveModal("ServiceCreate")}>
                  <FontAwesomeIcon icon={faPlus} />
                </AddBtnWrapper>
              )}
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
          <ServiceCardWrapperWrapper>
            {allServices
              ?.filter((service: ServiceType) => service?.agencyId === agencyId)
              ?.sort(sortByName)
              ?.map((service: ServiceType) => (
                <ServiceCardWrapper key={service?.id}>
                  <ServiceCard service={service} key={service?.id} />
                </ServiceCardWrapper>
              ))}
          </ServiceCardWrapperWrapper>
        )}
        {activeTab === "bulletinboard" && (
          <BulletinWrapper>
            {messageList?.map((message: any) => (
              <BulletinCard message={message} key={`${message?.id}`} />
            ))}
          </BulletinWrapper>
        )}
        {activeTab === "timeline" && (
          <TimelineWrapper>
            {agencyAssistance
              ?.sort(sortByDate)
              ?.map((assistance: SingleAssistanceType) => (
                <TimelineAssistanceCard
                  assistance={assistance}
                  key={`${assistance?.client?.id}-${assistance?.serviceId}-${assistance?.agencyId}`}
                />
              ))}
          </TimelineWrapper>
        )}
        {activeTab === "reports" && (
          <ReportsWrapper>
            <Reports />
          </ReportsWrapper>
        )}
      </ContentWrapper>
    </AgencyProfileWrapper>
  );
};

export default AgencyProfile;
