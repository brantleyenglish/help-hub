import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AgencyType } from "../../DataTypes";
import AgencyCard from "../components/agencyCard";
import { theme } from "../components/Theme";
import { useAgency } from "../context/AgencyContext";
import { usePublicData } from "../context/PublicContext";
import UWHeader from "../images/uw_header.png";

const AgencyListWrapper = styled.div`
  background-color: ${theme.colors.white};
  display: flex;
  flex-wrap: wrap;
  padding: 50px;
  justify-content: space-around;
`;
const AgencySearchWrapper = styled.div`
  padding: 40px 0px 40px 0px;
  text-align: center;
  background-color: ${theme.colors.blue};
  background-image: url(${UWHeader});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  & h1 {
    color: ${theme.colors.white};
    font-size: 45px;
    text-transform: uppercase;
  }
`;
const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: auto;
  display: flex;
  max-width: 500px;
  > svg {
    position: absolute;
    right: 20px;
    top: 5px;
  }
`;
const SearchBar = styled.input`
  width: 100%;
  padding: 5px;
  font-size: 12px;
`;
const StyledSVG = styled.img`
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(298deg)
    brightness(106%) contrast(100%);
  height: 22px;
`;
const CategoryButton = styled.button<{ active: boolean }>`
  background: ${(p) =>
    p?.active ? theme.colors.blue : theme.colors.lightBlue};
  outline: none;
  border: none;
  cursor: pointer;
  padding-top: 10px;
  margin: 10px 10px 0px;
  border-radius: 10px;
  /* border: 1px solid ${theme.colors.white}; */
  width: 40px;
  height: 40px;
  &:hover {
    background: ${theme.colors.blue};
    img {
      filter: invert(100%) sepia(100%) saturate(100%) hue-rotate(298deg)
        brightness(100%) contrast(100%);
    }
  }
  p {
    text-transform: uppercase;
    color: ${theme.colors.white};
    font-weight: 700;
    font-size: 8px;
  }
`;

const AgencyList = () => {
  const { agencies } = useAgency();
  const { categories } = usePublicData();

  const [search, setSearch] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");

  const updateCategory = (value: string) => {
    if (value === category) {
      setCategory("");
    } else {
      setCategory(value);
    }
  };

  const handleSearchUpdate = (e: React.BaseSyntheticEvent) => {
    setSearch(e.target.value?.toLowerCase());
  };

  const filteredAgencies = React.useMemo(() => {
    if (agencies) {
      return agencies
        ?.filter((agency: AgencyType) => {
          if (search?.length > 0) {
            return agency?.name?.toLowerCase()?.includes(search);
          }
          return true;
        })
        ?.filter((agency: AgencyType) => {
          if (category?.length > 0) {
            return agency?.categories?.includes(category);
          }
          return true;
        });
    }
    return [];
  }, [category, search, agencies]);

  return (
    <>
      <AgencySearchWrapper>
        <h1>Agencies</h1>
        <SearchInputWrapper>
          <SearchBar onChange={handleSearchUpdate} type="search" />
          <FontAwesomeIcon icon={faSearch} style={{ color: "#0e4680" }} />
        </SearchInputWrapper>
        {categories &&
          categories.map((categoryData: any) => (
            <CategoryButton
              onClick={() => updateCategory(categoryData?.name.toLowerCase())}
              key={categoryData?.label}
              active={categoryData?.name === category}
            >
              <StyledSVG src={categoryData?.icon} alt={categoryData?.label} />
              <p>{categoryData?.name}</p>
            </CategoryButton>
          ))}
      </AgencySearchWrapper>

      <AgencyListWrapper>
        {filteredAgencies &&
          filteredAgencies.map((agency: AgencyType) => (
            <Link to={`/agencies/${agency?.id}`} key={agency?.id}>
              <AgencyCard agency={agency} />
            </Link>
          ))}
      </AgencyListWrapper>
    </>
  );
};

export default AgencyList;
