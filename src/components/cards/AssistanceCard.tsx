import { faHeart, faPencil, faTrash } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { AssistanceDataType } from "../../../DataTypes";
import { useAgency } from "../../context/AgencyContext";
import { useModal } from "../../context/ModalContext";
import DeleteAssistanceModal from "../../modals/DeleteAssistanceModal";
import EditAssistanceModal from "../../modals/EditAssistanceModal";
import ModalWrapper from "../ModalWrapper";
import { theme } from "../Theme";

const AssistanceCardWrapper = styled.div`
  display: flex;
`;
const AssistanceCardIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  background: ${theme.colors.red};
  color: ${theme.colors.white};
  font-size: 10px;
  border-right: ${theme.colors.white} 5px solid;
  padding: 15px 20px;
  margin: 10px 0px;
  border-radius: 10px 0px 0px 10px;
`;
const AssistanceCardContentWrapper = styled.div`
background: ${theme.colors.grayLight};
color: ${theme.colors.gray};
margin: 10px 0px;
border-radius: 0px 10px 10px 0px;
padding: 15px 20px;
width: 100%;
& h1{
  color: ${theme.colors.blue};
  font-size: 25px;
  margin: 10px 0 0 0;
  padding: 0;
};
& h2{
    font-size: 20px;
    margin: 0;
    padding; 0;
};
`;
const AssistanceHeaderWrapper = styled.div`
  align-items: center;
  position: relative;
`;
const EditButton = styled.button`
  background: ${theme?.colors?.lightBlue};
  color: ${theme.colors.white};
  border: none;
  padding: 5px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: ${theme?.colors?.yellow};
    color: ${theme.colors.white};
  }
`;
const DeleteButton = styled.button`
  background: ${theme?.colors?.lightBlue};
  color: ${theme.colors.white};
  border: none;
  padding: 5px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 30px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: ${theme?.colors?.red};
    color: ${theme.colors.white};
  }
`;

type AssistanceCard = {
  assistance: AssistanceDataType;
};

const AssistanceCard: React.FC<AssistanceCard> = ({ assistance }) => {
  const { setActiveModal } = useModal();
  const { agency } = useAgency();

  return (
    <AssistanceCardWrapper>
      <AssistanceCardIconWrapper>
        <FontAwesomeIcon icon={faHeart} size="4x" />
      </AssistanceCardIconWrapper>
      <AssistanceCardContentWrapper>
        <AssistanceHeaderWrapper>
          <h1>{assistance?.service?.name}</h1>
          <h2>Provided by: {assistance?.agency?.name}</h2>
          {agency?.id === assistance?.agency?.id && (
            <>
              <ModalWrapper modalId="AssistanceEdit">
                <EditAssistanceModal assistance={assistance} />
              </ModalWrapper>
              <EditButton onClick={() => setActiveModal("AssistanceEdit")}>
                <FontAwesomeIcon icon={faPencil} />
              </EditButton>
              <ModalWrapper modalId="AssistanceDelete">
                <DeleteAssistanceModal assistanceId={assistance?.id || ""} />
              </ModalWrapper>
              <DeleteButton onClick={() => setActiveModal("AssistanceDelete")}>
                <FontAwesomeIcon icon={faTrash} />
              </DeleteButton>
            </>
          )}
        </AssistanceHeaderWrapper>
        <p>{assistance?.notes}</p>
        <p>Date of Assistance: {assistance?.date}</p>
      </AssistanceCardContentWrapper>
    </AssistanceCardWrapper>
  );
};

export default AssistanceCard;
