import { faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { usePublicData } from "src/context/PublicContext";
import styled from "styled-components";
import { AgencyType, CategoryType } from "../../../DataTypes";
import HHPlaceholder from "../../images/helphubPlaceholder.png";
import { theme } from "../Theme";

const StyledSVG = styled.img`
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(298deg)
    brightness(106%) contrast(100%);
  height: 22px;
`;
const AgencyCardWrapper = styled.div`
  display: flex;
  flex-flow: column;
  margin: 0px 25px;
`;
const AgencyCardContentWrapper = styled.div`
  background: ${theme.colors.grayLight};
  margin: 0px 0px 10px 0px;
  padding: 30px;
  width: 300px;
  min-height: 275px;
  border-radius: 10px 10px 0px 0px;
  p {
    color: ${theme.colors.gray};
  }
  a {
    color: ${theme.colors.lightBlue};
    line-break: anywhere;
    :hover {
      color: ${theme.colors.yellow};
    }
  }
`;
const AgencyCardHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  & img {
    object-fit: cover;
    border-radius: 10px;
    width: 70px;
    height: 70px;
    margin: 0px 20px 0px 0px;
    float: left;
  }
  & h1 {
    text-align: left;
    color: ${theme.colors.blue};
    font-size: 25px;
    padding-bottom: 0;
    margin-bottom: 5px;
    text-decoration: underline;
    line-break: auto;
  }
  & h1:hover {
    color: ${theme.colors.yellow};
    cursor: pointer;
  }
`;
const CategoryTagsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  flex-direction: row;
  padding: 30px;
  margin: 0 0 30px 0;
  background: ${theme.colors.grayLight};
  color: ${theme.colors.gray};
  font-size: 20px;
  border-radius: 0px 0px 10px 10px;
`;
const IconWrapper = styled.div`
  display: flex;
  color: ${theme.colors.white};
  background-color: ${theme.colors.blue};
  font-size: 20px;
  padding: 10px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

type AgencyCardType = {
  agency?: AgencyType;
};

const AgencyCard = ({ agency }: AgencyCardType) => {
  const { categories } = usePublicData();

  // const showState = { showAll: false }
  // const showMore = () => { setShowState({ showAll: true }); }
  // const showLess = () => { setShowState({ showAll: false }); }

  // const serives = getServicesByAgencyId(agencyId: agency?.id);
  return (
    <>
      <AgencyCardWrapper>
        <AgencyCardContentWrapper>
          <AgencyCardHeaderWrapper>
            <img
              src={agency?.profileUrl ? agency?.profileUrl : HHPlaceholder}
            />
            <Link to={`/agencies/${agency?.id}`} key={agency?.id}>
              <h1>{agency?.name}</h1>
            </Link>
          </AgencyCardHeaderWrapper>

          <p>{agency?.description}</p>

          {agency?.phone && (
            <p>
              <FontAwesomeIcon icon={faPhone} style={{ color: "#0e4680" }} />{" "}
              <a href={"tel:" + agency?.phone}>{agency?.phone}</a>
            </p>
          )}

          {agency?.website && (
            <p>
              <FontAwesomeIcon icon={faGlobe} style={{ color: "#0e4680" }} />{" "}
              <a
                href={
                  "http://" +
                  agency?.website.replace("https://", "").replace("http://", "")
                }
              >
                {agency?.website}
              </a>
            </p>
          )}
        </AgencyCardContentWrapper>
        <CategoryTagsWrapper>
          {agency?.categories &&
            agency?.categories.map((categoryId: string) => (
              <IconWrapper className="icon" key={categoryId}>
                <StyledSVG
                  src={
                    categories?.find(
                      (category: CategoryType) => category?.name === categoryId
                    )?.icon
                  }
                  alt={
                    categories?.find(
                      (category: CategoryType) => category?.name === categoryId
                    )?.icon
                  }
                />
              </IconWrapper>
            ))}
        </CategoryTagsWrapper>
      </AgencyCardWrapper>
    </>
  );
};

export default AgencyCard;
