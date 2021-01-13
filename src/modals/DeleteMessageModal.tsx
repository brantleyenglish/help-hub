import React from "react";
import styled from "styled-components";
import { theme } from "../components/Theme";
import { useModal } from "../context/ModalContext";
import { usePublicData } from "../context/PublicContext";
import { deleteMessage } from "../firebase/messages";

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

const DeleteMessageModal = ({ messageId }: { messageId: string }) => {
  const { setActiveModal } = useModal();
  const { refreshMessages } = usePublicData();
  return (
    <>
      <StyledHeader>
        <h2>Delete Message</h2>
        <p>Are you sure you want to delete this message?</p>
      </StyledHeader>

      <StyledButton
        onClick={async () => {
          deleteMessage({ messageId });
          if (refreshMessages) {
            await refreshMessages();
          }
          setActiveModal("");
        }}
      >
        Yes
      </StyledButton>
    </>
  );
};

export default DeleteMessageModal;
