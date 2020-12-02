import React from "react";
import styled from "styled-components";
import { theme } from "../Theme";
import {
    faFileAlt,
    faTimes,
    faPencil,
    faTrash,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FileCardWrapper = styled.div`
display: flex;
flex-flow: column;
margin: 10px;
align-items: center;
justify-content: center;

`;
const FileCardIconWrapper = styled.div`
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
  &:hover{
    background-color: ${theme.colors.yellow};
    cursor:pointer;
  };
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
margin 30px;
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
};
`;
const DeleteButton = styled.button`
background: ${theme?.colors?.lightBlue};
color: ${theme.colors.white};
border: none;
padding: 5px;
margin 30px;
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
    background: ${theme?.colors?.yellow};
    color: ${theme.colors.white};
};
`;


const FileCard = () => {

    // const [editMode, setEditMode] = React.useState<boolean>(false);

    return (
        <FileCardWrapper>
            <FileCardIconWrapper>
                <FontAwesomeIcon icon={faFileAlt} size="4x" />
            </FileCardIconWrapper>
            <FileCardContentWrapper>
                <FileHeaderWrapper>
                    <h1>File Title</h1>
                    <h2>Added by: Agency Name</h2>
                </FileHeaderWrapper>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem nihil dicta cumque inventore amet deleniti. Aperiam repellat nisi fugit illum saepe optio doloribus ipsam amet provident ipsum, ex dolor sed?</p>
                <p>Date Created: 01 / 02 / 2020</p>
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
            </FileCardContentWrapper>
        </FileCardWrapper>
    );
};

export default FileCard;