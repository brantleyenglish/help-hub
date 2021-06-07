import {
  faCalendarAlt,
  faEnvelope,
  faMap,
  faMapMarkerAlt,
  faPencil,
  faPhone,
  faPlus,
  faTrash,
  faUsers,
  faVenusMars,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  ClientFiles,
  ClientNotes,
  SingleAssistanceType,
} from "../../DataTypes";
import AssistanceCard from "../components/cards/AssistanceCard";
import FileCard from "../components/cards/FileCard";
import NoteCard from "../components/cards/NoteCard";
import ModalWrapper from "../components/ModalWrapper";
import { theme } from "../components/Theme";
import { useAgency } from "../context/AgencyContext";
import { useAssistance } from "../context/AssistanceContext";
import { useAuth } from "../context/AuthContext";
import { useClient } from "../context/ClientContext";
import { useModal } from "../context/ModalContext";
import AddAssistanceModal from "../modals/AddAssistanceModal";
import AddFileModal from "../modals/AddFileModal";
import AddNoteModal from "../modals/AddNoteModal";
import DeleteClientModal from "../modals/DeleteClientModal";
import EditClientModal from "../modals/EditClientModal";
import sortByDate from "../utils/sortByDate";

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
  margin: auto;
  border-radius: 30px;
  padding: 40px 30px 50px 30px;
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
  border-radius: 2px;
  cursor: pointer;
  top: 10px;
  right: 10px;
  &:hover {
    background: ${theme?.colors?.white};
    color: ${theme.colors.blue};
  }
`;
const DeleteButton = styled.button`
  background: ${theme?.colors?.lightBlue};
  color: ${theme.colors.white};
  outline: none;
  border: none;
  padding: 5px;
  margin-right: 40px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 2px;
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
    color: ${theme.colors.white};
    margin: 0;
    padding: 0;
  }
  & a {
    color: ${theme.colors.white};
    margin: 0;
    padding: 0;
    :hover {
      color: ${theme.colors.lightBlue};
    }
  }
  & h3 {
    color: ${theme.colors.yellow};
    margin: 20px 0 0 0;
    padding: 0 0 5px 0;
    font-size: 16px;
  }
`;
const FormLeftWrapper = styled.div`
  max-width: 325px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  const { user } = useAuth();
  const { agency } = useAgency();

  const history = useHistory();

  React.useEffect(() => {
    if (!user) {
      history.push(`/`);
    }
  }, []);

  const { clientProfile, getClientProfile } = useClient();
  const { assistance } = useAssistance();

  const { setActiveModal } = useModal();

  const [activeTab, setActiveTab] = React.useState<ActiveTabType>(
    "assistances"
  );

  React.useEffect(() => {
    if (getClientProfile) {
      getClientProfile({ clientId });
    }
  }, []);

  return (
    <ClientProfileWrapper>
      <ModalWrapper modalId="ClientEdit">
        <EditClientModal clientId={clientId} />
      </ModalWrapper>
      <ModalWrapper modalId="ClientDelete">
        <DeleteClientModal clientId={clientId} />
      </ModalWrapper>
      {clientProfile && (
        <ClientBackground>
          <ClientCardWrapper>
            <TitleWrapper>
              <h1>
                {clientProfile?.clientFirstName} {clientProfile?.clientLastName}
              </h1>
              {agency?.admin && (
                <DeleteButton
                  type="button"
                  onClick={() => setActiveModal("ClientDelete")}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </DeleteButton>
              )}
              <EditButton
                type="button"
                onClick={() => setActiveModal("ClientEdit")}
              >
                <FontAwesomeIcon icon={faPencil} />
              </EditButton>
            </TitleWrapper>
            <FormContentWrapper>
              <FormLeftWrapper>
                {clientProfile?.dob && (
                  <>
                    <h3>
                      <FontAwesomeIcon icon={faCalendarAlt} /> Date of Birth
                    </h3>
                    <p>{clientProfile?.dob}</p>
                  </>
                )}
                {clientProfile?.phone && (
                  <>
                    <h3>
                      <FontAwesomeIcon icon={faPhone} /> Phone
                    </h3>
                    <a href={"tel:" + clientProfile?.phone}>
                      {clientProfile?.phone}
                    </a>
                  </>
                )}
                {clientProfile?.email && (
                  <>
                    <h3>
                      <FontAwesomeIcon icon={faEnvelope} /> Email
                    </h3>
                    <a href={"mailto:" + clientProfile?.email}>
                      {clientProfile?.email}
                    </a>
                  </>
                )}
                {clientProfile?.streetAddress && (
                  <>
                    <h3>
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> Address
                    </h3>
                    <a
                      href={
                        "http://maps.google.com/?q=" +
                        clientProfile?.streetAddress +
                        "," +
                        clientProfile?.city +
                        "," +
                        clientProfile?.state +
                        "," +
                        clientProfile?.zip
                      }
                    >
                      {clientProfile?.streetAddress}, {clientProfile?.city},{" "}
                      {clientProfile?.state} {clientProfile?.zip}
                    </a>
                  </>
                )}
              </FormLeftWrapper>
              <FormRightWrapper>
                {clientProfile?.gender && (
                  <>
                    <h3>
                      <FontAwesomeIcon icon={faVenusMars} /> Gender
                    </h3>
                    <p>{clientProfile?.gender}</p>
                  </>
                )}
                {clientProfile?.ethnicity && (
                  <>
                    <h3>
                      <FontAwesomeIcon icon={faUsers} /> Ethnicity
                    </h3>
                    <p>{clientProfile?.ethnicity}</p>
                  </>
                )}
                {clientProfile?.county && (
                  <>
                    <h3>
                      <FontAwesomeIcon icon={faMap} /> Current County
                    </h3>
                    <p>{clientProfile?.county}</p>
                  </>
                )}
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
              <AddAssistanceModal client={clientProfile} />
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

        {activeTab === "assistances" &&
          assistance
            ?.sort(sortByDate)
            ?.map((assistance: SingleAssistanceType, index: number) => (
              <AssistanceCard
                assistance={assistance}
                key={`${assistance?.serviceId}-${index}`}
              />
            ))}

        {activeTab === "notes" &&
          clientProfile?.notes
            ?.filter(
              (note: ClientNotes) =>
                !note?.isPrivate || note?.agencyId === user?.uid
            )
            ?.sort(sortByDate)
            ?.map((note: ClientNotes, index: number) => (
              <NoteCard note={note} key={note?.subject} />
            ))}

        {activeTab === "files" && (
          <FileCardWrapper>
            {clientProfile?.files
              ?.filter(
                (file: ClientFiles) =>
                  !file?.isPrivate || file?.agencyId === user?.uid
              )
              ?.sort(sortByDate)
              ?.map((file: ClientFiles, index: number) => (
                <FileCard file={file} key={file?.fileTitle} />
              ))}
          </FileCardWrapper>
        )}
      </ContentWrapper>
    </ClientProfileWrapper>
  );
};

export default ClientProfile;
