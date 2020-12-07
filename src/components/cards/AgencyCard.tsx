import { faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import {
  AgencyType,
  CategoryType,
  ServiceListType,
  ServiceType,
} from "../../../DataTypes";
import { usePublicData } from "../../context/PublicContext";
import { getServicesByAgencyId } from "../../firebase/services";
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
  margin: 0px 25px 50px 25px;
`;
const AgencyCardContentWrapper = styled.div`
  background: ${theme.colors.grayLight};
  margin: 0px 0px 10px 0px;
  padding: 30px;
  width: 250px;
  min-height: 275px;
  border-radius: 10px 10px 0px 0px;
  p {
    color: ${theme.colors.gray};
  }
`;
const AgencyCardHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  & img {
    object-fit: cover;
    border-radius: 999px;
    width: 70px;
    height: 70px;
    margin: 0px 20px 0px 0px;
    float: left;
  }
  & h1 {
    text-align: left;
    color: ${theme.colors.blue};
    font-size: 25px;
  }
  & h1:hover {
    color: ${theme.colors.lightBlue};
    cursor: pointer;
  }
`;
const CategoryTagsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 30px;
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
  const [services, setServices] = React.useState<ServiceListType>([]);
  const { categories } = usePublicData();

  React.useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    if (agency?.id) {
      const serviceData = await getServicesByAgencyId({ agencyId: agency?.id });
      if (serviceData !== "Error") {
        setServices(serviceData);
      }
    }
  };

  const agencyCategories = React.useMemo(() => {
    return services
      ?.reduce((accu: string[], service: ServiceType) => {
        return [...accu, ...service?.categories];
      }, [])
      ?.filter(
        (value: string, index: number, self: string[]) =>
          self.indexOf(value) === index
      );
  }, [services]);

  // const serives = getServicesByAgencyId(agencyId: agency?.id);
  return (
    <AgencyCardWrapper>
      <AgencyCardContentWrapper>
        <AgencyCardHeaderWrapper>
          <img src={HHPlaceholder} alt="agencylogo" />
          <h1>{agency?.name}</h1>
        </AgencyCardHeaderWrapper>

        <p>{agency?.description}</p>

        <p>
          <FontAwesomeIcon icon={faPhone} style={{ color: "#0e4680" }} />{" "}
          {agency?.phone}
        </p>

        <p>
          <FontAwesomeIcon icon={faGlobe} style={{ color: "#0e4680" }} />{" "}
          {agency?.website}
        </p>
      </AgencyCardContentWrapper>
      <CategoryTagsWrapper>
        {agencyCategories.map((categoryId: string) => (
          <IconWrapper>
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
  );
};

export default AgencyCard;
