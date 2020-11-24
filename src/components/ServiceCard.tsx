import React from "react";
import styled from "styled-components";
import { theme } from "./Theme";
import { usePublicData } from "../context/PublicContext";
import {
  faHeartbeat,
  faTshirt,
  faUtensils,
  faHome,
  faBookReader,
  faWheelchair,
  faHandsHelping,
  faQuestion,
  faSearch,
  faPhone,
  faGlobe,
  faUser,
  faMapMarkerAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledSVG = styled.img`
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(298deg)
    brightness(106%) contrast(100%);
  height: 20px;
`;
const ServiceCardWrapper = styled.div`
background-color: ${theme.colors.grayLight};
border-radius: 15px;
width: 400px;
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
};
& p{
  color: ${theme.colors.gray};
  text-align: justify;
  padding: 0px 30px 0px 30px;
};
& h3{
  padding: 0px 30px 0px 30px;
};
`;
const ServiceCardHeaderWrapper = styled.div`
align-items: center;
padding: 0px 30px;
padding-top: 30px;
& h1{
  text-align: left;
  color: ${theme.colors.blue};
  margin: 0;
  font-size: 25px;
};
& h1:hover{
  color: ${theme.colors.lightBlue};
};
& h3{
  padding: 0px;
  margin: 0px;
};
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

type ServiceType = {
  id: String;
  name: String;
  description: String;
  contactFirstName: String;
  contactLastName: String;
  phone: String;
  email: String;
  streetAddress: String;
  city: String;
  state: String;
  zip: String;
  categories: string[];
  agencyId: String;
};

type ServiceCardType = {
  service?: ServiceType;
};

const ServiceCard = ({ service }: ServiceCardType) => {
  const { categories } = usePublicData();
  return (
    <>
      <ServiceCardWrapper>
        <ServiceCardHeaderWrapper>
          <h1>{service?.name}</h1>
          <h3>Provided by Agency Name</h3>
        </ServiceCardHeaderWrapper>

        <p>{service?.description}</p>

        <h3>CONTACT INFO:</h3>
        <p><FontAwesomeIcon icon={faUser} style={{ color: "#0e4680" }} /> Contact: {service?.contactFirstName} {service?.contactLastName}</p>
        <p><FontAwesomeIcon icon={faPhone} style={{ color: "#0e4680" }} /> Phone: {service?.phone}</p>
        <p><FontAwesomeIcon icon={faEnvelope} style={{ color: "#0e4680" }} /> Email: {service?.email}</p>
        <p><FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "#0e4680", paddingRight: 5 }} />{service?.streetAddress}, {service?.city}, {service?.state}  {service?.zip}</p>

        <CategoryTagsWrapper>
          <p>SERVICE CATEGORIES:</p>
          <a><FontAwesomeIcon icon={faHeartbeat} /></a>
          <a><FontAwesomeIcon icon={faTshirt} /></a>
          <a><FontAwesomeIcon icon={faUtensils} /></a>
        </CategoryTagsWrapper>

      </ServiceCardWrapper>

    </>
  );
};

export default ServiceCard;
