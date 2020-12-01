import React from "react";
import styled from "styled-components";
import { theme } from "../Theme";
import {
    faComment,
    faTimes,
    faPencil,
    faTrash,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NoteCardWrapper = styled.div`
display: flex;
`;
const NoteCardIconWrapper = styled.div`
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
  `;
const NoteCardContentWrapper = styled.div`
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
};
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
    background: ${theme?.colors?.yellow};
    color: ${theme.colors.white};
};
`;


const NoteCard = () => {

    // const [editMode, setEditMode] = React.useState<boolean>(false);

    return (
        <NoteCardWrapper>
            <NoteCardIconWrapper>
                <FontAwesomeIcon icon={faComment} size="4x" />
            </NoteCardIconWrapper>
            <NoteCardContentWrapper>
                <NoteHeaderWrapper>
                    <h1>Note Title</h1>
                    <h2>Created by: Agency Name</h2>
                    {/* <EditButton type="button" onClick={() => setEditMode(!editMode)}>
                        {editMode ? (
                            <FontAwesomeIcon icon={faTimes} />
                        ) : ( */}
                    <EditButton>
                        <FontAwesomeIcon icon={faPencil} />
                    </EditButton>
                    {/* )}
                    </EditButton> */}
                    <DeleteButton>
                        <FontAwesomeIcon icon={faTrash} />
                    </DeleteButton>
                </NoteHeaderWrapper>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem nihil dicta cumque inventore amet deleniti. Aperiam repellat nisi fugit illum saepe optio doloribus ipsam amet provident ipsum, ex dolor sed?</p>
                <p>Date of Note: 01 / 02 / 2020</p>
            </NoteCardContentWrapper>
        </NoteCardWrapper>
    );
};

export default NoteCard;