import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { theme } from "../../components/Theme";

const SearchBarWrapper = styled.span`
display: inline-flex;
align-items: center;
& input{
  border: none;
  border-radius: 15px;
  width: 350px;
  height: 15px;
  margin-right: 10px;
  padding: 7px;
  padding-left: 20px;
};
& input:focus{
  outline: none;
};
`;

const SearchBarBtnWrapper = styled.button`
color: white;
background-color: ${theme.colors.gray};
width: 85px;
border: none;
border-radius: 15px;
padding: 7px;
outline: none;
&:hover{
  background-color: ${theme.colors.lightBlue};
  cursor: pointer;
};
`;

const SearchBar = () => {
  return (
    <>
      <SearchBarWrapper>
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input placeholder="Search for Services or Agencies" />
      </SearchBarWrapper>
      <SearchBarBtnWrapper>GO</SearchBarBtnWrapper>
    </>
  );
};

export default SearchBar;
