import { faFileAlt, faPencil, faTrash } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { ClientFiles } from "../../../DataTypes";
import { useAgency } from "../../context/AgencyContext";
import { useModal } from "../../context/ModalContext";
import { usePublicData } from "../../context/PublicContext";
import DeleteFileModal from "../../modals/DeleteFileModal";
import EditFileModal from "../../modals/EditFileModal";
import ModalWrapper from "../ModalWrapper";
import { theme } from "../Theme";

const FileCardWrapper = styled.div`
  display: flex;
  flex-flow: column;
  margin: 10px;
  align-items: center;
  justify-content: center;
`;
const FileCardIconWrapper = styled.a<{ isTranslucent: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 250px;
  background: ${theme.colors.blue};
  color: ${theme.colors.white};
  font-size: 10px;
  border-bottom: ${theme.colors.white} 5px solid;
  padding: 15px 20px;
  margin: 10px 0px 0px 0px;
  border-radius: 10px 10px 0px 0px;
  opacity: ${(p) => (p?.isTranslucent ? 0.4 : 1)};

  &:hover {
    background-color: ${theme.colors.yellow};
    cursor: pointer;
  }
`;
const FileCardContentWrapper = styled.div`
background: ${theme.colors.grayLight};
color: ${theme.colors.gray};
position: relative;
margin: 0px 0px 10px 0px;
border-radius: 0px 0px 10px 10px;
padding: 15px 20px;
width: 250px;
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
const FileHeaderWrapper = styled.div`
  align-items: center;
`;
const EditButton = styled.button`
  background: ${theme?.colors?.lightBlue};
  color: ${theme.colors.white};
  border: none;
  padding: 5px;
  margin: 30px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
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
  margin: 30px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 30px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: ${theme?.colors?.red};
    color: ${theme.colors.white};
  }
`;

const FileCard: React.FC<{ file: ClientFiles }> = ({ file }) => {
  const { setActiveModal } = useModal();
  const { allAgencies } = usePublicData();
  const { agency } = useAgency();

  return (
    <FileCardWrapper>
      <FileCardIconWrapper
        href={file?.downloadUrl}
        target="_blank"
        isTranslucent={!!file?.isPrivate}
      >
        <FontAwesomeIcon icon={faFileAlt} size="4x" />
      </FileCardIconWrapper>
      <FileCardContentWrapper>
        <FileHeaderWrapper>
          <h1>{file?.fileTitle}</h1>
          <h2>
            {file?.isPrivate === true && "Private File Added by "}
            {file?.isPrivate === false && "Added by "} {file?.agencyName}
          </h2>
        </FileHeaderWrapper>
        {file?.description && <p>{file?.description}</p>}
        <p>Date Created: {file?.date}</p>
        {agency?.id === file?.agencyId && (
          <>
            <ModalWrapper modalId={`FileEdit-${file?.fileTitle}`}>
              <EditFileModal file={file} />
            </ModalWrapper>
            <EditButton
              onClick={() => setActiveModal(`FileEdit-${file?.fileTitle}`)}
            >
              <FontAwesomeIcon icon={faPencil} />
            </EditButton>

            <ModalWrapper modalId={`FileDelete-${file?.fileTitle}`}>
              <DeleteFileModal file={file} />
            </ModalWrapper>
            <DeleteButton
              onClick={() => setActiveModal(`FileDelete-${file?.fileTitle}`)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </DeleteButton>
          </>
        )}
      </FileCardContentWrapper>
    </FileCardWrapper>
  );
};

export default FileCard;
