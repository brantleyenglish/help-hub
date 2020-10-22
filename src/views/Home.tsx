import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { usePublicData } from "../context/PublicContext";
import UnitedWayLogo from "../images/unitedway_logo.png";

const StyledSVG = styled.img`
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(298deg)
    brightness(106%) contrast(100%);
  height: 60px;
`;

const Home = () => {
  const { categories } = usePublicData();

  return (
    <div>
      <div className="home-search">
        <h1> Find Help, Get Help.</h1>
        <h2>Search dozens of agencies and their services.</h2>
        <span className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            className="searchbar"
            placeholder="Search for Services or Agencies"
          />
        </span>
        <button className="search-button">GO</button>
      </div>
      <div className="home-categories">
        <div className="cat-row-1">
          {categories &&
            categories.map((category: any) => (
              <span className="category-container">
                <StyledSVG src={category.icon} alt={category.label} />
                <p>{category.label}</p>
              </span>
            ))}
        </div>
      </div>
      <div className="call">
        <h1> Can't find what you need?</h1>
        <button>CALL 211</button>
      </div>
      <div className="about">
        <img src={UnitedWayLogo} alt="United Way Logo" />
        <div>
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
        </div>
      </div>
    </div>
  );
};

export default Home;
