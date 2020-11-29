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
import helphubPlaceholder from "../images/helphubPlaceholder.png";
import { theme } from "./Theme";

const AgencyCardWrapper = styled.div`
  background-color: ${theme.colors.grayLight};
  border-radius: 15px;
  width: 300px;
  margin: 10px;
  padding: 0px;
  & a {
    display: flex;
    color: ${theme.colors.white};
    background-color: ${theme.colors.blue};
    font-size: 19px;
    width: 12px;
    height: 14px;
    padding: 14px;
    margin: 30px 30px 0px 15px;
    border-radius: 9px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  & p {
    color: ${theme.colors.gray};
    text-align: justify;
    padding: 0px 30px 0px 30px;
  }
`;

const AgencyCardHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 30px;
  padding-top: 30px;
  & img {
    max-width: 70px;
    padding: 0px 20px 0px 0px;
    float: left;
  }
  & h1 {
    text-align: left;
    color: ${theme.colors.blue};
    margin: 0;
    font-size: 25px;
  }
  & h1:hover {
    color: ${theme.colors.lightBlue};
  }
`;

const CategoryTagsWrapper = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
border-top: 8px white solid;
margin: 0;
padding 0px 0px 30px 0px;
& p{
  margin-bottom:0;
  padding-bottom:0;
};
& a{
  margin: 15px 20px 0px;
};
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
      <AgencyCardHeaderWrapper>
        <img src={helphubPlaceholder} alt="agencylogo" />
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

      <CategoryTagsWrapper>
        <p>SERVICE CATEGORIES:</p>
        <FontAwesomeIcon icon={faHeartbeat} />
        <FontAwesomeIcon icon={faTshirt} />
        <FontAwesomeIcon icon={faUtensils} />
      </CategoryTagsWrapper>
    </AgencyCardWrapper>
  );
};

export default AgencyCard;
