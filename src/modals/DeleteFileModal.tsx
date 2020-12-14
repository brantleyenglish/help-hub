import React from "react";
import styled from "styled-components";
import { ClientFiles } from "../../DataTypes";
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

const DeleteFileModal = ({ file }: { file: ClientFiles }) => {
  const { updateClientInfo, clientProfile, getClientProfile } = useClient();
  const { setActiveModal } = useModal();
  return (
    <>
      <StyledHeader>
        <h2>Delete File</h2>
        <p>Are you sure you want to delete this file?</p>
      </StyledHeader>

      <StyledButton
        onClick={async () => {
          if (clientProfile?.id && getClientProfile && updateClientInfo) {
            await updateClientInfo({
              clientId: clientProfile?.id,
              newData: {
                files: clientProfile?.files?.filter(
                  (currentFile: ClientFiles) =>
                    currentFile?.fileTitle !== file?.fileTitle
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

export default DeleteFileModal;
