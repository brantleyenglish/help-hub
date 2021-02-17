import { faComment, faPencil, faTrash } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { ClientNotes } from "../../../DataTypes";
import { useAgency } from "../../context/AgencyContext";
import { useModal } from "../../context/ModalContext";
import { usePublicData } from "../../context/PublicContext";
import DeleteNoteModal from "../../modals/DeleteNoteModal";
import EditNoteModal from "../../modals/EditNoteModal";
import ModalWrapper from "../ModalWrapper";
import { theme } from "../Theme";

const NoteCardWrapper = styled.div`
  display: flex;
`;
const NoteCardIconWrapper = styled.div<{ isTranslucent: boolean }>`
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
  opacity: ${(p) => (p?.isTranslucent ? 0.4 : 1)};
`;
const NoteCardContentWrapper = styled.div`
  background: ${theme.colors.grayLight};
  color: ${theme.colors.gray};
  margin: 10px 0px;
  border-radius: 0px 10px 10px 0px;
  padding: 15px 20px;
  width: 100%;
  & h1 {
    color: ${theme.colors.blue};
    font-size: 25px;
    margin: 10px 0 0 0;
    padding: 0;
  }
  & h2 {
    font-size: 20px;
    margin: 0;
    padding: 0;
  }
`;
const NoteHeaderWrapper = styled.div`
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

const NoteCard: React.FC<{ note: ClientNotes }> = ({ note }) => {
  const { allAgencies } = usePublicData();
  const { setActiveModal } = useModal();
  const { agency } = useAgency();

  return (
    <NoteCardWrapper>
      <NoteCardIconWrapper isTranslucent={!!note?.isPrivate}>
        <FontAwesomeIcon icon={faComment} size="4x" />
      </NoteCardIconWrapper>
      <NoteCardContentWrapper>
        <NoteHeaderWrapper>
          <h1>{note?.subject}</h1>
          <h2>
            {note?.isPrivate == true && "Private Note Created by "}
            {note?.isPrivate === false && "Created by "} {note?.agencyName}
          </h2>
          {(agency?.admin || agency?.id === note?.agencyId) && (
            <>
              <ModalWrapper modalId={`NoteEdit-${note?.message}`}>
                <EditNoteModal note={note} />
              </ModalWrapper>
              <EditButton
                onClick={() => setActiveModal(`NoteEdit-${note?.message}`)}
              >
                <FontAwesomeIcon icon={faPencil} />
              </EditButton>
              <ModalWrapper modalId={`NoteDelete-${note?.message}`}>
                <DeleteNoteModal note={note} />
              </ModalWrapper>
              <DeleteButton
                onClick={() => setActiveModal(`NoteDelete-${note?.message}`)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </DeleteButton>
            </>
          )}
        </NoteHeaderWrapper>
        {note?.message && <p>{note?.message}</p>}
        <p>Date of Note: {note?.date}</p>
      </NoteCardContentWrapper>
    </NoteCardWrapper>
  );
};

export default NoteCard;
