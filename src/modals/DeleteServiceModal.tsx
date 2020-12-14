import React from "react";
import styled from "styled-components";
import { theme } from "../components/Theme";
import { usePublicData } from "../context/PublicContext";
import { useModal } from "../context/ModalContext";
import { deleteService } from "../firebase/services";

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
h2,p{
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
                <h2>Delete Service</h2>
                <p>Are you sure you want to delete this service?</p>
            </StyledHeader>

            <StyledButton
                onClick={async () => {
                    //     deleteService({ serviceId });
                    //     if (updateAssistanceByClient) {
                    //         await updateAssistanceByClient();
                    //     }
                    setActiveModal("");
                }}
            >
                Yes
      </StyledButton>
        </>
    );
};

export default DeleteServiceModal;
