
import React from "react";
import styled from "styled-components";
import { theme } from "./Theme";
import {
    faHeartbeat,
    faTshirt,
    faUtensils,
    faHome,
    faBookReader,
    faWheelchair,
    faHandsHelping,
    faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
};
& a:hover{
    background-color: ${theme.colors.lightBlue};
    color: ${theme.colors.white};
};
& p{
    text-transform: uppercase;
    margin: 8px;
    color: ${theme.colors.white};
    font-weight: 700;
    font-size: 8px;
};
`;


const CategoryFilters = () => {
    return (
        <CategoryFiltersWrapper>
            <span>
                <a><FontAwesomeIcon icon={faHeartbeat} /></a>
                <p>Health</p>
            </span>
            <span>
                <a><FontAwesomeIcon icon={faTshirt} /></a>
                <p>Household</p>
            </span>
            <span>
                <a><FontAwesomeIcon icon={faUtensils} /></a>
                <p>Food</p>
            </span>
            <span>
                <a><FontAwesomeIcon icon={faHome} /></a>
                <p>Housing</p>
            </span>
            <span>
                <a><FontAwesomeIcon icon={faBookReader} /></a>
                <p>Education</p>
            </span>
            <span>
                <a><FontAwesomeIcon icon={faWheelchair} /></a>
                <p>Disability</p>
            </span>
            <span>
                <a><FontAwesomeIcon icon={faHandsHelping} /></a>
                <p>Abuse</p>
            </span>
            <span>
                <a><FontAwesomeIcon icon={faQuestion} /></a>
                <p>Others</p>
            </span>
        </CategoryFiltersWrapper>

    );
}

export default CategoryFilters;