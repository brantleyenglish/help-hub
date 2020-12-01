import {
  faBookReader,
  faHandsHelping,
  faHeartbeat,
  faHome,
  faQuestion,
  faTshirt,
  faUtensils,
  faWheelchair,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { theme } from "./Theme";

const CategoryFiltersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  & a {
    display: flex;
    color: ${theme.colors.blue};
    background-color: ${theme.colors.white};
    font-size: 15px;
    width: 9px;
    height: 9px;
    padding: 10px;
    text-align: center;
    margin: 15px;
    margin-bottom: 10px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  & a:hover {
    background-color: ${theme.colors.lightBlue};
    color: ${theme.colors.white};
  }
  & p {
    text-transform: uppercase;
    margin: 8px;
    color: ${theme.colors.white};
    font-weight: 700;
    font-size: 8px;
  }
`;

const CategoryFilters = () => {
  return (
    <CategoryFiltersWrapper>
      <span>
        <FontAwesomeIcon icon={faHeartbeat} />
        <p>Health</p>
      </span>
      <span>
        <FontAwesomeIcon icon={faTshirt} />
        <p>Household</p>
      </span>
      <span>
        <FontAwesomeIcon icon={faUtensils} />
        <p>Food</p>
      </span>
      <span>
        <FontAwesomeIcon icon={faHome} />
        <p>Housing</p>
      </span>
      <span>
        <FontAwesomeIcon icon={faBookReader} />
        <p>Education</p>
      </span>
      <span>
        <FontAwesomeIcon icon={faWheelchair} />
        <p>Disability</p>
      </span>
      <span>
        <FontAwesomeIcon icon={faHandsHelping} />
        <p>Abuse</p>
      </span>
      <span>
        <FontAwesomeIcon icon={faQuestion} />
        <p>Others</p>
      </span>
    </CategoryFiltersWrapper>
  );
};

export default CategoryFilters;
