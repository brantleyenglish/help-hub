import React from "react";
import styled from "styled-components";

import { usePublicData } from "../../context/PublicContext";

const StyledSVG = styled.img`
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(298deg)
    brightness(106%) contrast(100%);
  height: 60px;
`;

const Categories = () => {
  const { categories } = usePublicData();
  return (
    <div className="home-categories">
      <div className="cat-row-1">
        {categories &&
          categories.map((category) => (
            <span className="category-container" key={category.label}>
              <a>
                <StyledSVG src={category.icon} alt={category.label} />
              </a>
              <p>{category.label}</p>
            </span>
          ))}
      </div>
    </div>
  );
};

export default Categories;
