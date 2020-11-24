import React from "react";
import { Link } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import { usePublicData } from "../context/PublicContext";
import SearchBar from "../components/searchbar";
import CategoryFilters from "../components/catFilters";
import UWHeader from "../images/uw_header.png";
import styled from "styled-components";
import { theme } from "../components/Theme";

// SEARCH FUCTION
// state = {
//     searchQuery: " "
// };
// _onChangeSearch = query => this.setState({ searchQuery: query });
// const { searchQuery } = state;

const ServiceSearchWrapper = styled.div`
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

const ServiceListWrapper = styled.div`
background-color: ${theme.colors.white};
padding: 10px;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-around;
`;

const ServiceList = () => {
  const { allServices } = usePublicData();

  console.log({ allServices });
  return (
    <>
      <ServiceSearchWrapper>
        <h1> Services </h1>
        <SearchBar></SearchBar>
        <CategoryFilters></CategoryFilters>
      </ServiceSearchWrapper>

      <ServiceListWrapper>
        {allServices &&
          allServices.map((service: any) => (
            <Link to={`/services/${service?.id}`} key={service.id}>
              <ServiceCard service={service} />
            </Link>
          ))}
      </ServiceListWrapper>
    </>
  );
};

export default ServiceList;
