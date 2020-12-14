import React from "react";
import styled from "styled-components";
import { ClientNotes } from "../../DataTypes";
import { theme } from "../components/Theme";
import { useClient } from "../context/ClientContext";
import { useModal } from "../context/ModalContext";

const StyledButton = styled.button`
  background: ${theme.colors.blue};
  color: ${theme.colors.white};
  border: none;
  outline: none;
  padding: 5px 10px;
  border-radius: 5px;
  &:hover {
    background: ${theme.colors.lightBlue};
    cursor: pointer;
  }
`;
const StyledHeader = styled.div`
  color: ${theme.colors.blue};
  h2,
  p {
    margin: 0;
    padding: 0px 0px 20px 0;
  }
`;

const DeleteNoteModal = ({ note }: { note: ClientNotes }) => {
  const { updateClientInfo, clientProfile, getClientProfile } = useClient();
  const { setActiveModal } = useModal();
  return (
    <>
      <StyledHeader>
        <h2>Delete Note</h2>
        <p>Are you sure you want to delete this note?</p>
      </StyledHeader>

      <StyledButton
        onClick={async () => {
          if (clientProfile?.id && getClientProfile && updateClientInfo) {
            await updateClientInfo({
              clientId: clientProfile?.id,
              newData: {
                notes: clientProfile?.notes?.filter(
                  (currentNote: ClientNotes) =>
                    currentNote?.message !== note?.message
                ),
              },
            });
            getClientProfile({ clientId: clientProfile?.id });
          }
          setActiveModal("");
        }}
      >
        Yes
      </StyledButton>
    </>
  );
};

export default DeleteNoteModal;
