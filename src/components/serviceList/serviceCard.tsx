import React from "react";
import helphubPlaceholder from "../../images/helphubPlaceholder.png";
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
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { usePublicData } from "../../context/PublicContext";

const StyledSVG = styled.img`
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(298deg)
    brightness(106%) contrast(100%);
  height: 20px;
`;

type ServiceType = {
  name: String;
  id: String;
  description: String;
  categories: string[];
  agencyId: String;
  phoneNumber: String;
  streetAddress: String;
}

type ServiceCardType = {
  service?: ServiceType;
}

const ServiceCard = ({ service }: ServiceCardType) => {
  const { categories } = usePublicData();
  return (
    <div className="service-pg">
      <div className="service-list">
        <div className="service-col-1">
          <div className="service-card-icon">
            <img src={helphubPlaceholder} alt="#" />
          </div>
          <h2>{service?.name}</h2>
          <p>{service?.description}</p>
        </div>
        <div className="service-col-2">
          <ul>
            <li style={{ fontSize: 20, textTransform: "uppercase" }}>
              Contact Info
            </li>
            <li>
              <FontAwesomeIcon
                icon={faPhone}
                style={{ color: "#B23633", paddingRight: 5 }}
              />{" "}
              {service?.phoneNumber}
            </li>
            <li>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{ color: "#B23633", paddingRight: 5 }}
              />{" "}
              {service?.streetAddress}
            </li>
            <div className="sm-cat">
              {/* {categories
                ?.filter((category) =>
                  service?.categories?.includes(category?.name)
                )
                ?.map((category) => (
                  <span className="category-container">
                    <a>
                      <StyledSVG src={category.icon} alt={category.label} />
                    </a>
                    <p>{category.label}</p>
                  </span>
                ))} */}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};


export default ServiceCard;
