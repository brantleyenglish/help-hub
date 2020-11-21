import React from "react";
import styled from "styled-components";
import SearchBar from "../components/global/searchbar";
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
& h1{
  font-size: 45px;
  margin-bottom: 0px;
  text-transform: uppercase;
};
& h2{
  font-size: 25px;
  margin-top: 10px;
};
`;
const CallWrapper = styled.div`  
display: flex;
background-color: ${theme.colors.grayLight};
padding: 10px;
padding-top: 3vw;
padding-bottom: 3vw;
color: ${theme.colors.gray};
justify-content: center;
align-items: center;
text-align: center;
& button{
  padding: 0.5vw 2vw 0.5vw 2vw;
  margin: 1vw;
  margin-left: 2vw;
  border-radius: 1vw;
  background-color: ${theme.colors.lightBlue};
  border: none;
  color: ${theme.colors.white};
  cursor: pointer;
};
& button:hover{
  background-color: ${theme.colors.blue};
};`;
const BigCatWrapper = styled.div`
max-width: 800px;
min-width: 500px;
background-color: ${theme.colors.white};
padding-top: 2vw;
padding-bottom: 5vw;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
& a{
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
};
& a:hover {
  background-color: ${theme.colors.blue};
};
`;
const CatSpanWrapper = styled.span`
display: flex;
flex-direction: column;
text-align: center;
& p{
  text-transform: uppercase;
  margin: 0;
  color: ${theme.colors.blue};
  font-weight: 700;
};
`;
const AboutWrapper = styled.div`
display: flex;
  flex-wrap: wrap;
  margin: 2vw;
  margin-left: 15vw;
  margin-right: 15vw;
  background-color: ${theme.colors.white};
  padding: 10px 100px;
  color: ${theme.colors.gray};
& h1{
  color: ${theme.colors.blue};
  font-weight: 1000;
};
& p{
  font-family: "Roboto";
  font-weight: 500;
};
`;


const Home = () => {
  const { categories } = usePublicData();

  return (
    <>
      <SearchWrapper>
        <h1> Find Help, Get Help.</h1>
        <h2>Search dozens of agencies and their services.</h2>
        <SearchBar></SearchBar>
      </SearchWrapper>

      <BigCatWrapper>
        {categories &&
          categories.map((category: any) => (
            <CatSpanWrapper>
              <a>
                <StyledSVG src={category.icon} alt={category.label} /></a>
              <p>{category.label}</p>
            </CatSpanWrapper>
          ))}
      </BigCatWrapper>

      <CallWrapper>
        <h1> Can't find what you need?</h1>
        <button>CALL 211</button>
      </CallWrapper>

      <AboutWrapper>
        <h1>ABOUT US</h1>
        <p>
          As the central hub within the nonprofit sector in West Tennessee, we
          unite people in ways that improve each person’s access to health,
            education, and financial stability.{" "}
        </p>
        <p>
          With a 75-year history of service to West Tennessee, we are leading
          our communities toward sustainable change. We connect people in need
          to the resources that can help them, and we unite people who want to
          help with the opportunity to do so.
          </p>
        <p>
          We focus on empowering our communities by partnering with local
          agencies who are actively meeting the needs of our communities.
          United Way brings together the best people in each community to
          determine the most critical needs that require collective - not
          individual - action.
          </p>
      </AboutWrapper>
    </>
  );
};

export default Home;
