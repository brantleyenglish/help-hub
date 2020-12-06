import {
  faCalendarAlt,
  faEnvelope,
  faMapMarkedAlt,
  faMapMarkerAlt,
  faPencil,
  faPhone,
  faPlus,
  faUsers,
  faVenusMars,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { ClientType } from "../../DataTypes";
import AssistanceCard from "../components/cards/AssistanceCard";
import FileCard from "../components/cards/FileCard";
import NoteCard from "../components/cards/NoteCard";
import ModalWrapper from "../components/ModalWrapper";
import { theme } from "../components/Theme";
import { useClient } from "../context/ClientContext";
import { useModal } from "../context/ModalContext";
import { getClient } from "../firebase/clients";
import EditClientModal from "../modals/EditClientModal";
import AddAssistanceModal from "../modals/AddAssistanceModal";
import AddNoteModal from "../modals/AddNoteModal";
import AddFileModal from "../modals/AddFileModal";


const ClientProfileWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  background: ${theme.colors.white};
`;
const ClientBackground = styled.div`
  width: 100%;
  background: ${theme.colors.blue};
  padding: 0;
`;
const ClientCardWrapper = styled.div`
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
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: pointer;
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
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  justify-content: space-between;
  & p {
    margin-top: 0;
    padding-top: 0;
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
const FileCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
`;

type ClientProfileType = {
  match: any;
};

type ActiveTabType = "assistances" | "notes" | "files";

const ClientProfile = ({ match }: ClientProfileType) => {
  const { clientId } = match.params;
  const { client, updateClientInfo } = useClient();

  const [clientProfile, setClientProfile] = React.useState<ClientType | null>(
    null
  );

  const { setActiveModal } = useModal();

  const [activeTab, setActiveTab] = React.useState<ActiveTabType>(
    "assistances"
  );

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
      <ModalWrapper modalId="ClientEdit">
        <EditClientModal
          clientProfile={clientProfile}
          getClientProfile={getClientProfile}
        />
      </ModalWrapper>
      {clientProfile && (
        <ClientBackground>
          <ClientCardWrapper>
            <TitleWrapper>
              <h1>
                {clientProfile?.clientFirstName} {clientProfile?.clientLastName}
              </h1>
              <EditButton
                type="button"
                onClick={() => setActiveModal("ClientEdit")}
              >
                <FontAwesomeIcon icon={faPencil} />
              </EditButton>
            </TitleWrapper>
            <FormContentWrapper>
              <FormLeftWrapper>
                <h3>
                  <FontAwesomeIcon icon={faCalendarAlt} /> Date of Birth
                </h3>
                <p>{clientProfile?.dob}</p>
                <h3>
                  <FontAwesomeIcon icon={faPhone} /> Phone
                </h3>
                <p>{clientProfile?.phone}</p>
                <h3>
                  <FontAwesomeIcon icon={faEnvelope} /> Email
                </h3>
                <p>{clientProfile?.email}</p>
                <h3>
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> Address
                </h3>
                <p>
                  {clientProfile?.streetAddress}, {clientProfile?.city},{" "}
                  {clientProfile?.state} {clientProfile?.zip}
                </p>
              </FormLeftWrapper>
              <FormRightWrapper>
                <h3>
                  <FontAwesomeIcon icon={faVenusMars} /> Gender
                </h3>
                <p>{clientProfile?.gender}</p>
                <h3>
                  <FontAwesomeIcon icon={faUsers} /> Ethnicity
                </h3>
                <p>{clientProfile?.ethnicity}</p>
                <h3>
                  <FontAwesomeIcon icon={faMapMarkedAlt} /> County
                </h3>
                <p>{clientProfile?.county}</p>
              </FormRightWrapper>
            </FormContentWrapper>
          </ClientCardWrapper>
        </ClientBackground>
      )}
      <ContentWrapper>
        <NavigationWrapper>

          {/* ASSISTANCES NAV BUTTON*/}
          <NavigationButton
            isActive={activeTab === "assistances"}
            onClick={() => setActiveTab("assistances")}
          >
            <ModalWrapper modalId="AssistanceCreate">
              <AddAssistanceModal />
            </ModalWrapper>
            <p>ASSISTANCES</p>
            <AddBtnWrapper onClick={() => setActiveModal("AssistanceCreate")}>
              <FontAwesomeIcon icon={faPlus} />
            </AddBtnWrapper>
          </NavigationButton>

          {/* NOTES NAV BUTTON */}
          <NavigationButton
            isActive={activeTab === "notes"}
            onClick={() => setActiveTab("notes")}
          >
            <ModalWrapper modalId="NoteCreate">
              <AddNoteModal />
            </ModalWrapper>
            <p>NOTES</p>
            <AddBtnWrapper onClick={() => setActiveModal("NoteCreate")}>
              <FontAwesomeIcon icon={faPlus} />
            </AddBtnWrapper>
          </NavigationButton>

          {/* FILES NAV BUTTON */}
          <NavigationButton
            isActive={activeTab === "files"}
            onClick={() => setActiveTab("files")}
          >
            <ModalWrapper modalId="FileCreate">
              <AddFileModal />
            </ModalWrapper>
            <p>FILES</p>
            <AddBtnWrapper onClick={() => setActiveModal("FileCreate")}>
              <FontAwesomeIcon icon={faPlus} />
            </AddBtnWrapper>
          </NavigationButton>
        </NavigationWrapper>

        {activeTab === "assistances" && (
          <>
            <AssistanceCard />
            <AssistanceCard />
            <AssistanceCard />
          </>
        )}
        {activeTab === "notes" && (
          <>
            <NoteCard />
            <NoteCard />
            <NoteCard />
          </>
        )}
        {activeTab === "files" && (
          <FileCardWrapper>
            <FileCard />
            <FileCard />
            <FileCard />
            <FileCard />
          </FileCardWrapper>
        )}
      </ContentWrapper>
    </ClientProfileWrapper>
  );
};

export default ClientProfile;
