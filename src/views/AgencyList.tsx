import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { AgencyType } from "../../DataTypes";
import AgencyCard from "../components/cards/AgencyCard";
import { theme } from "../components/Theme";
import { useAgency } from "../context/AgencyContext";
import { usePublicData } from "../context/PublicContext";
import UWHeader from "../images/uw_header.png";

const AgencyListWrapper = styled.div`
  background-color: ${theme.colors.white};
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
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
    margin-bottom: 0;
    text-weight: 300;
  }
  & h3 {
    color: ${theme.colors.white};
    text-transform: uppercase;
    margin-top: 10px;
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
const CategoryButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 525px;
  justify-content: center;
  margin: 15px auto 0px auto;
`;
const CategoryButton = styled.button<{ active: boolean }>`
  background: ${(p) =>
    p?.active ? theme.colors.yellow : theme.colors.lightBlue};

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
  align-items: center;
  text-align: center;

  outline: none;
  border: none;
  cursor: pointer;
  padding-top: 10px;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  p {
    text-transform: uppercase;
    color: ${theme.colors.white};
    font-weight: 700;
    font-size: 8px;
    padding-top: 5px;

    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  &:hover {
    background: ${theme.colors.yellow};
    img {
      filter: invert(100%) sepia(100%) saturate(100%) hue-rotate(298deg)
        brightness(100%) contrast(100%);
    }
  }
`;

const AgencyList = () => {
  const { agencies } = useAgency();
  const { categories, counties } = usePublicData();

  const [search, setSearch] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [county, setCounty] = React.useState<string>("");

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

  const sortAgencies = (a: AgencyType, b: AgencyType) => {
    if (a?.name && b?.name) {
      if (a?.name < b?.name) {
        return -1;
      }
      if (a?.name > b?.name) {
        return 1;
      }
    }
    return 0;
  };

  const filteredAgencies = React.useMemo(() => {
    if (agencies) {
      return agencies
        ?.filter(
          (agency: AgencyType) =>
            county?.length === 0 || agency?.counties?.includes(county)
        )
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
        })
        ?.sort(sortAgencies);
    }
    return [];
  }, [category, search, agencies, county]);

  return (
    <>
      <AgencySearchWrapper>
        <h1>Agencies</h1>
        <h3>Search keywords or sort by service category.</h3>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <SearchInputWrapper>
            <SearchBar onChange={handleSearchUpdate} type="search" />
            <select
              onChange={(e) => {
                e?.preventDefault();
                setCounty(e?.target?.value);
              }}
            >
              <option value="">All Counties</option>
              {counties &&
                counties?.map((option: string, index: number) => (
                  <option value={option} key={`${option}-${index}`}>
                    {option}
                  </option>
                ))}
            </select>
            <FontAwesomeIcon
              icon={faSearch}
              style={{ color: "#0e4680", right: 100 }}
            />
          </SearchInputWrapper>
        </form>
        <CategoryButtonWrapper>
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
        </CategoryButtonWrapper>
      </AgencySearchWrapper>

      <AgencyListWrapper>
        {filteredAgencies &&
          filteredAgencies
            .filter((agency) => agency?.name)
            .map((agency: AgencyType) => <AgencyCard agency={agency} />)}
      </AgencyListWrapper>
    </>
  );
};

export default AgencyList;
