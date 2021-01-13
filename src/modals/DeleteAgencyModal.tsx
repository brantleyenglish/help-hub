import React from "react";
import styled from "styled-components";
import { theme } from "../components/Theme";
import { useModal } from "../context/ModalContext";
import { usePublicData } from "../context/PublicContext";
import { deleteAgency } from "../firebase/agencies";

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

const DeleteAgencyModal = ({ agencyId }: { agencyId: string }) => {
  const { refreshAgencies } = usePublicData();
  const { setActiveModal } = useModal();
  return (
    <>
      <StyledHeader>
        <h2>Delete Agency</h2>
        <p>Are you sure you want to delete this agency?</p>
        <p>
          WARNING: This will remove all assistance, messages, and servies tied
          to this agency!!
        </p>
      </StyledHeader>

      <StyledButton
        onClick={async () => {
          await deleteAgency({ agencyId });
          if (refreshAgencies) {
            await refreshAgencies();
          }
          setActiveModal("");
        }}
      >
        Yes
      </StyledButton>
    </>
  );
};

export default DeleteAgencyModal;
