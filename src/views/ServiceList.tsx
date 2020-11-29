import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ServiceType } from "../../DataTypes";
import ServiceCard from "../components/ServiceCard";
import { theme } from "../components/Theme";
import { usePublicData } from "../context/PublicContext";
import UWHeader from "../images/uw_header.png";
import useQuery from "../utils/useQuery";

const ServiceSearchWrapper = styled.div`
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

const StyledSVG = styled.img`
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(298deg)
    brightness(106%) contrast(100%);
  height: 22px;
`;

const ServiceListWrapper = styled.div`
  background-color: ${theme.colors.white};
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ServiceWrapper = styled.div``;

const SearchBar = styled.input`
  width: 100%;
  padding: 5px;
  font-size: 12px;
`;

const AdvancedSearchBar = styled.input`
  padding: 5px;
  font-size: 12px;
  flex: 1;
  margin: 0px 10px;
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

const CategoryButton = styled.button<{ active: boolean }>`
  background: ${(p) =>
    p?.active ? theme.colors.blue : theme.colors.lightBlue};
  outline: none;
  border: none;
  cursor: pointer;
  margin: 10px 5px 0px;
  border-radius: 10px;
  border: 1px solid ${theme.colors.white};
  width: 40px;
  height: 40px;
  &:hover {
    background: ${theme.colors.blue};
    img {
      filter: invert(100%) sepia(100%) saturate(100%) hue-rotate(298deg)
        brightness(100%) contrast(100%);
    }
  }
`;

type ServiceListType = {};

const ServiceList: React.FC<ServiceListType> = () => {
  const query = useQuery();
  const urlCategory = query.get("category")?.toLowerCase() || "";
  const urlSearch = query.get("search")?.toLowerCase() || "";

  const { allServices, categories } = usePublicData();

  const [search, setSearch] = React.useState<string>(urlSearch);
  const [category, setCategory] = React.useState<string>(urlCategory);

  console.log({ allServices, category });

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

  const filteredServices = React.useMemo(() => {
    if (allServices) {
      return allServices
        ?.filter((service: ServiceType) => {
          if (search?.length > 0) {
            return service?.name?.toLowerCase()?.includes(search);
          }
          return true;
        })
        ?.filter((service: ServiceType) => {
          if (category?.length > 0) {
            return service?.categories?.includes(category);
          }
          return true;
        });
    }
    return [];
  }, [category, search, allServices]);

  return (
    <ServiceWrapper>
      <ServiceSearchWrapper>
        <h1> Services </h1>
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
            </CategoryButton>
          ))}
      </ServiceSearchWrapper>

      <ServiceListWrapper>
        {filteredServices &&
          filteredServices.map((service: ServiceType) => (
            <Link to={`/services/${service?.id}`} key={service.id}>
              <ServiceCard service={service} />
            </Link>
          ))}
      </ServiceListWrapper>
    </ServiceWrapper>
  );
};

export default ServiceList;
