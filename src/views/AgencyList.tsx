import React from "react";
import styled from "styled-components";
import { theme } from "../components/Theme";
import { Link } from "react-router-dom";
import { useAgency } from "../context/AgencyContext";

import UWHeader from "../images/uw_header.png";
import SearchBar from "../components/searchbar";
import CategoryFilters from "../components/catFilters";
import AgencyCard from "../components/agencyCard";

const AgencySearchWrapper = styled.div`
padding: 40px 0px 40px 0px;
text-align: center;
background-color: ${theme.colors.blue};
background-image: url(${UWHeader});
background-size: cover;
background-position: center center;
background-repeat: no-repeat;
& h1{
    color: ${theme.colors.white};
    font-size: 45px;
    text-transform: uppercase;
};
`;

const AgencyListWrapper = styled.div`
background-color: ${theme.colors.white};
padding: 10px;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-around;
`;

const AgencyList = () => {
  const { agencies } = useAgency();

  return (
    <>
      <AgencySearchWrapper>
        <h1> Agencies </h1>
        <SearchBar></SearchBar>
        <CategoryFilters></CategoryFilters>
      </AgencySearchWrapper>

      <AgencyListWrapper>
        {agencies &&
          agencies.map((agency) => (
            <Link to={`/agencies/${agency?.id}`} key={agency?.id}>
              <AgencyCard agency={agency} />
            </Link>
          ))}
      </AgencyListWrapper>
    </>
  );
};

export default AgencyList;
