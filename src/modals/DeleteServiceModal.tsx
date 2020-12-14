import React from "react";
import styled from "styled-components";
import { theme } from "../components/Theme";
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

const DeleteServiceModal = ({ serviceId }: { serviceId: string }) => {
  // const { updateAssistanceByClient } = useAssistance();
  const { setActiveModal } = useModal();
  return (
    <>
      <StyledHeader>
        <h2>Remove Service</h2>
        <p>Are you sure you want to remove this service?</p>
      </StyledHeader>

      <StyledButton>
        {/* //   onClick={async () => {
            //     deleteAssitance({ assistanceId });
            //     if (updateAssistanceByClient) {
            //       await updateAssistanceByClient();
            //     }
            //     setActiveModal("");
            //   }}
            > */}
        Yes
      </StyledButton>
    </>
  );
};

export default DeleteServiceModal;
