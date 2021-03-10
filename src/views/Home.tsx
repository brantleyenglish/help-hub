import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../components/Theme";
import { usePublicData } from "../context/PublicContext";
import UWHeader from "../images/uw_header.png";

const StyledSVG = styled.img`
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(298deg)
    brightness(106%) contrast(100%);
  height: 60px;
`;
const SearchWrapper = styled.div`
  padding: 4em 0px 6em 0px;
  text-align: center;
  color: ${theme.colors.white};
  background-color: ${theme.colors.blue};
  background-image: url(${UWHeader});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  & h1 {
    font-size: 45px;
    margin-bottom: 0px;
    text-transform: uppercase;
  }
  & h2 {
    font-size: 25px;
    margin-top: 10px;
  }
`;
const BigCatWrapper = styled.div`
  max-width: 800px;
  min-width: 500px;
  background-color: ${theme.colors.white};
  padding-top: 1vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
  & a {
    display: flex;
    color: ${theme.colors.blue};
    background-color: ${theme.colors.lightBlue};
    font-size: 60px;
    width: 90px;
    height: 90px;
    padding: 10px;
    text-align: center;
    margin: 35px;
    margin-bottom: 10px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  & a:hover {
    background-color: ${theme.colors.blue};
  }
`;
const CatSpanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  & p {
    text-align: center;
    max-width: 90px;
    text-transform: uppercase;
    margin: 0;
    color: ${theme.colors.blue};
    font-weight: 700;
  }
`;
const AboutWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 30px 0 30px;
  background-color: ${theme.colors.blue};
  justify-content: center;
  align-items: center;
  color: ${theme.colors.white};
  & div{
    max-width: 650px;
    padding: 70px 0 90px 0;
  }
  & h1 {
    color: ${theme.colors.white};
    font-weight: 1000;
    text-transform: uppercase;
    margin-bottom: 10px;
    text-align: center;
  }
  & p {
    color: ${theme.colors.grayLight};
    font-family: "Roboto";
    font-weight: 500;
    line-height: 30px;
  }
  & h2{
    color: ${theme.colors.white};
    text-align: center;
    text-transform: uppercase;
    margin: 70px 0 0 0;
  }
  & a {
    padding: 0.5vw 2vw 0.5vw 2vw;
    margin: 1vw;
    margin-left: 2vw;
    border-radius: 1vw;
    font-size: 17px;
    background-color: ${theme.colors.lightBlue};
    border: none;
    color: ${theme.colors.white};
    cursor: pointer;
  }
  & a:hover {
    background-color: ${theme.colors.yellow};
  }
`;
const StyledCatTitle = styled.h2`
  margin-top: 40px;
  margin-bottom: 0px;
  padding: 0;
  font-size: 30px;
  text-align: center;
  text-transform: uppercase;
  color: ${theme.colors.blue};
  font-weight: bold;
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
  @media (max-width: 767px) {
    margin: 30px;
    justify-content: center;
  }
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 5px;
  font-size: 12px;
`;

const MapWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 30px 0 30px;
  padding-bottom: 5vw;
  margin: auto;
  text-align: center;
  max-width: 800px;
p{
  color: ${theme.colors.blue};
}
`;

const Home = () => {
  const { categories } = usePublicData();
  const history = useHistory();
  const [search, setSearch] = React.useState<string>("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSearchUpdate = (e: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    setSearch(e.target.value?.toLowerCase());
  };

  const handleSubmit = () => {
    if (search?.length > 0) {
      history?.push(`/services?search=${search}`);
    }
  };

  return (
    <>
      <SearchWrapper>
        <h1> Find Help, Get Help.</h1>
        <h2>Search dozens of agencies and their services.</h2>
        <SearchInputWrapper>
          <SearchBar
            onChange={handleSearchUpdate}
            type="search"
            onKeyDown={handleKeyDown}
          />
          <FontAwesomeIcon
            icon={faSearch}
            style={{ color: "#0e4680" }}
            onClick={handleSubmit}
          />
        </SearchInputWrapper>
      </SearchWrapper>

      <StyledCatTitle>Search Services by Category</StyledCatTitle>

      <BigCatWrapper>
        {categories &&
          categories.map((category: any) => (
            <CatSpanWrapper key={category?.name}>
              <Link to={`/services?category=${category?.name}`}>
                <StyledSVG src={category.icon} alt={category.label} />
              </Link>
              <p>{category.label}</p>
            </CatSpanWrapper>
          ))}
      </BigCatWrapper>

      <MapWrapper>
        <StyledCatTitle>Search by Location</StyledCatTitle>
        <p>Browse United Way's network of agencies. Open the side bar to filter by category.</p>
        <iframe src="https://www.google.com/maps/d/embed?mid=19QNsTbvbLyuTXGFUiVcNuy6YARKuRLDB" width="100%" height="480"></iframe>      </MapWrapper>

      <AboutWrapper>
        <div>
          <h1>Welcome to the 211 Hub</h1>
          <p>United Way of West Tennessee advocates for equity through Uniting agencies in ways that improve each person’s access to health, education, and financial stability. Our extensive footprint allows us to collaborate with over 60 area nonprofits spanning 14 counties across the West Tennessee region. By helping them acquire resources, we empower them to assist those in need within their local area.</p>
          <h2> Can't find what you need?  <a href="tel:211">CALL 211</a></h2>
        </div>

      </AboutWrapper>


    </>
  );
};

export default Home;
