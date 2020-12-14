import {
  faEnvelope,
  faMapMarkerAlt,
  faPencil,
  faPhone,
  faTrash,
  faUser,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { AgencyType } from "../../../DataTypes";
import { useAgency } from "../../context/AgencyContext";
import { useModal } from "../../context/ModalContext";
import { usePublicData } from "../../context/PublicContext";
import DeleteServiceModal from "../../modals/DeleteServiceModal";
import EditServiceModal from "../../modals/EditServiceModal";
import ModalWrapper from "../ModalWrapper";
import { theme } from "../Theme";

const StyledSVG = styled.img`
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(298deg)
    brightness(106%) contrast(100%);
  height: 22px;
`;
const ServiceCardWrapper = styled.div`
display: flex;
flex-flow: column;
margin: 0px 25px 50px 25px;
}
`;
const ServiceCardContentWrapper = styled.div`
  background: ${theme.colors.grayLight};
  margin: 0px 0px 10px 0px;
  padding: 30px;
  width: 300px;
  min-height: 275px;
  border-radius: 10px 10px 0px 0px;
  p {
    color: ${theme.colors.gray};
  }
  & h3 {
    color: ${theme.colors.lightBlue};
    padding: 0px;
    margin: 0px;
  }
`;
const ServiceCardHeaderWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  & h1 {
    text-align: left;
    color: ${theme.colors.blue};
    font-size: 25px;
    padding-bottom: 0;
    margin-bottom: 5px;
  }
`;
const CategoryTagsWrapper = styled.div`
display: flex;
  justify-content: space-between;
  width: 300px;
  flex-direction: row;
  padding 30px;
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
const EditButton = styled.button`
  background: ${theme?.colors?.lightBlue};
  color: ${theme.colors.white};
  border: none;
  padding: 5px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: ${theme?.colors?.yellow};
    color: ${theme.colors.white};
  }
`;
const DeleteButton = styled.button`
  background: ${theme?.colors?.lightBlue};
  color: ${theme.colors.white};
  border: none;
  padding: 5px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 30px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: ${theme?.colors?.red};
    color: ${theme.colors.white};
  }
`;

type ServiceType = {
  id: String;
  name: String;
  description: String;
  contactFirstName: String;
  contactLastName: String;
  phone: String;
  email: String;
  streetAddress: String;
  city: String;
  state: String;
  zip: String;
  categories: string[];
  agencyId: String;
};

type ServiceCardType = {
  service?: ServiceType;
};

const ServiceCard = ({ service }: ServiceCardType) => {
  const { allAgencies } = usePublicData();
  const { categories } = usePublicData();
  const { agency } = useAgency();

  const { setActiveModal } = useModal();

  return (
    <>
      <ServiceCardWrapper>
        <ServiceCardContentWrapper>
          <ServiceCardHeaderWrapper>
            <>
              {agency?.id === service?.agencyId && (
                <>
                  <ModalWrapper modalId={`ServiceEdit-${service?.id}`}>
                    <EditServiceModal
                    // service={service}
                    />
                  </ModalWrapper>
                  <EditButton
                    onClick={() => setActiveModal(`ServiceEdit-${service?.id}`)}
                  >
                    <FontAwesomeIcon icon={faPencil} />
                  </EditButton>
                  <ModalWrapper modalId={`ServiceDelete-${service?.id}`}>
                    <DeleteServiceModal
                    // serviceId={service?.id || ""} 
                    />
                  </ModalWrapper>
                  <DeleteButton
                    onClick={() =>
                      setActiveModal(`ServiceDelete-${service?.id}`)
                    }
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </DeleteButton>
                </>
              )}
              <h1>{service?.name}</h1>
              <h3>
                Provided by{" "}
                {
                  allAgencies?.find(
                    (agency: AgencyType) => agency?.id === service?.agencyId
                  )?.name
                }
              </h3>
            </>
          </ServiceCardHeaderWrapper>

          <p>{service?.description}</p>

          <h3>Contact Information:</h3>
          {service?.contactFirstName && (
            <p>
              <FontAwesomeIcon icon={faUser} style={{ color: "#0e4680" }} />{" "}
              Contact: {service?.contactFirstName} {service?.contactLastName}
            </p>
          )}
          {service?.phone && (
            <p>
              <FontAwesomeIcon icon={faPhone} style={{ color: "#0e4680" }} />{" "}
              Phone: {service?.phone}
            </p>
          )}
          {service?.email && (
            <p>
              <FontAwesomeIcon icon={faEnvelope} style={{ color: "#0e4680" }} />{" "}
              Email: {service?.email}
            </p>
          )}
          {service?.streetAddress && (
            <p>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{ color: "#0e4680", paddingRight: 5 }}
              />
              {service?.streetAddress}, {service?.city}, {service?.state}{" "}
              {service?.zip}
            </p>
          )}
        </ServiceCardContentWrapper>
        <CategoryTagsWrapper>
          {categories &&
            categories
              .filter((category) =>
                service?.categories?.includes(category?.name)
              )
              .map((categoryData: any) => (
                <IconWrapper className="icon">
                  <StyledSVG
                    src={categoryData?.icon}
                    alt={categoryData?.label}
                  />
                </IconWrapper>
              ))}
        </CategoryTagsWrapper>
      </ServiceCardWrapper>
    </>
  );
};

export default ServiceCard;
