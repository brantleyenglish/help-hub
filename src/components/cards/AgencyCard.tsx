import {
  faGlobe,
  faHeartbeat,
  faPhone,
  faTshirt,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import HHPlaceholder from "../../images/helphubPlaceholder.png";
import { theme } from "../Theme";

const AgencyCardWrapper = styled.div`
  display: flex;
  flex-flow: column;
  margin: 0px 25px 50px 25px;
`;
const AgencyCardContentWrapper = styled.div`
background: ${theme.colors.grayLight};
margin: 0px 0px 10px 0px;
padding: 30px;
width: 250px;
min-height: 275px;
border-radius: 10px 10px 0px 0px;
p{
  color: ${theme.colors.gray};
};
`;
const AgencyCardHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  & img {
    object-fit: cover;
    border-radius: 999px;
    width: 70px;
    height: 70px;
    margin: 0px 20px 0px 0px;
    float: left;
  }
  & h1 {
    text-align: left;
    color: ${theme.colors.blue};
    font-size: 25px;
  }
  & h1:hover {
    color: ${theme.colors.lightBlue};
    cursor: pointer;
  }
`;
const CategoryTagsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding 30px;
  background: ${theme.colors.grayLight};
  color: ${theme.colors.gray};
  font-size: 20px;
  border-radius: 0px 0px 10px 10px;
`;
const IconWrapper = styled.div`
display: flex;
color: ${theme.colors.white};
background-color: ${theme.colors.blue};
font-size: 20px;
padding: 10px;
width: 20px;
height: 20px;
border-radius: 10px;
align-items: center;
justify-content: center;
`;

type AgencyType = {
  name: String;
  id: String;
  city: String;
  contactFirstName: String;
  contactLastName: String;
  description: String;
  phone: String;
  streetAddress: String;
  website: String;
  zip: String;
};

type AgencyCardType = {
  agency?: AgencyType;
};

const AgencyCard = ({ agency }: AgencyCardType) => {
  return (
    <AgencyCardWrapper>
      <AgencyCardContentWrapper>
        <AgencyCardHeaderWrapper>
          <img src={HHPlaceholder} alt="agencylogo" />
          <h1>{agency?.name}</h1>
        </AgencyCardHeaderWrapper>

        <p>{agency?.description}</p>

        <p>
          <FontAwesomeIcon icon={faPhone} style={{ color: "#0e4680" }} />{" "}
          {agency?.phone}
        </p>

        <p>
          <FontAwesomeIcon icon={faGlobe} style={{ color: "#0e4680" }} />{" "}
          {agency?.website}
        </p>
      </AgencyCardContentWrapper>
      <CategoryTagsWrapper>
        <IconWrapper><FontAwesomeIcon icon={faHeartbeat} /></IconWrapper>
        <IconWrapper><FontAwesomeIcon icon={faTshirt} /></IconWrapper>
        <IconWrapper><FontAwesomeIcon icon={faUtensils} /></IconWrapper>
        <IconWrapper><FontAwesomeIcon icon={faHeartbeat} /></IconWrapper>
      </CategoryTagsWrapper>
    </AgencyCardWrapper>
  );
};

export default AgencyCard;
