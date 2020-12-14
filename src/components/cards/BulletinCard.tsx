import {
  faPencil,
  faThumbtack,
  faTrash,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { AgencyType } from "../../../DataTypes";
import { useAgency } from "../../context/AgencyContext";
import { useModal } from "../../context/ModalContext";
import { usePublicData } from "../../context/PublicContext";
import DeleteBulletinModal from "../../modals/DeleteBulletinModal";
import EditBulletinModal from "../../modals/EditBulletinModal";
import ModalWrapper from "../ModalWrapper";
import { theme } from "../Theme";

const BulletinCardWrapper = styled.div`
  display: flex;
`;
const BulletinCardIconWrapper = styled.div<{ isTranslucent: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  background: ${theme.colors.yellow};
  color: ${theme.colors.white};
  font-size: 10px;
  border-right: ${theme.colors.white} 5px solid;
  padding: 15px 20px;
  margin: 10px 0px;
  border-radius: 10px 0px 0px 10px;
  opacity: ${(p) => (p?.isTranslucent ? 0.7 : 1)};
`;
const BulletinCardContentWrapper = styled.div`
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
const BulletinHeaderWrapper = styled.div`
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

type MessageType = {
  subject: string;
  message: string;
  agencyId: string;
  date: string;
  isPrivate: string;
  id?: string;
};

type MessageCardType = {
  message?: MessageType;
};

const BulletinCard = ({ message }: MessageCardType) => {
  const { allAgencies } = usePublicData();
  const { allServices, allPublicMessages } = usePublicData();
  const { agency, updateAgencyInfo, agencyMessages } = useAgency();
  const { setActiveModal } = useModal();

  return (
    <BulletinCardWrapper>
      <BulletinCardIconWrapper isTranslucent={!!message?.isPrivate}>
        <FontAwesomeIcon icon={faThumbtack} size="4x" />
      </BulletinCardIconWrapper>
      <BulletinCardContentWrapper>
        <BulletinHeaderWrapper>
          <h1>{message?.subject}</h1>
          <h2>
            Created by:{" "}
            {
              allAgencies?.find(
                (agency: AgencyType) => agency?.id === message?.agencyId
              )?.name
            }
          </h2>
          {message?.id && agency?.id === message?.agencyId && (
            <>
              <ModalWrapper modalId={`MessageEdit-${message?.id}`}>
                <EditBulletinModal message={message} />
              </ModalWrapper>
              <EditButton
                onClick={() => setActiveModal(`MessageEdit-${message?.id}`)}
              >
                <FontAwesomeIcon icon={faPencil} />
              </EditButton>
              <ModalWrapper modalId={`MessageDelete-${message?.id}`}>
                <DeleteBulletinModal messageId={message?.id} />
              </ModalWrapper>
              <DeleteButton
                onClick={() => setActiveModal(`MessageDelete-${message?.id}`)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </DeleteButton>
            </>
          )}
        </BulletinHeaderWrapper>
        <p>{message?.message}</p>
        <p>{message?.date}</p>
      </BulletinCardContentWrapper>
    </BulletinCardWrapper>
  );
};

export default BulletinCard;
