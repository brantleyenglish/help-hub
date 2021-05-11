import { faHeart } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { SingleAssistanceType } from "../../../DataTypes";
import { theme } from "../Theme";

const TimelineAssistanceCardWrapper = styled.div`
  display: flex;
  & a {
    color: ${theme.colors.lightBlue};
  }
`;
const TimelineAssistanceCardIconWrapper = styled.div<{
  isTranslucent: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  background: ${theme.colors.red};
  color: ${theme.colors.white};
  font-size: 10px;
  border-right: ${theme.colors.white} 5px solid;
  padding: 15px 20px;
  margin: 10px 0px;
  border-radius: 10px 0px 0px 10px;
  opacity: ${(p) => (p?.isTranslucent ? 0.4 : 1)};
`;
const TimelineAssistanceCardContentWrapper = styled.div`
  background: ${theme.colors.grayLight};
  color: ${theme.colors.gray};
  margin: 10px 0px;
  border-radius: 0px 10px 10px 0px;
  padding: 15px 20px;
  width: 100%;
`;
const TimelineAssistanceHeaderWrapper = styled.div`
  align-items: center;
  position: relative;
  h1 {
    color: ${theme.colors.blue};
    font-size: 20px;
    margin: 10px 0 0 0;
    padding: 0;
  }
  h2 {
    color: ${theme.colors.red};
    font-size: 20px;
    margin: 0;
    padding: 0;
  }
  button {
    background: none;
    outline: none;
    border: none;
    font-size: 18px;
    color: ${theme.colors.lightBlue};
    cursor: pointer;
    padding: 0;
    &:hover {
      color: ${theme.colors.blue};
    }
  }
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

type TimelineAssistanceCard = {
  assistance: SingleAssistanceType;
};

const TimelineAssistanceCard: React.FC<TimelineAssistanceCard> = ({
  assistance,
}) => {
  const history = useHistory();
  return (
    <TimelineAssistanceCardWrapper>
      <TimelineAssistanceCardIconWrapper
        isTranslucent={!!assistance?.isPrivate}
      >
        <FontAwesomeIcon icon={faHeart} size="4x" />
      </TimelineAssistanceCardIconWrapper>
      <TimelineAssistanceCardContentWrapper>
        <TimelineAssistanceHeaderWrapper>
          <h1>
            <button
              onClick={() =>
                history?.push(`/clients/${assistance?.client?.id}`)
              }
            >
              {assistance?.client?.clientFirstName}{" "}
              {assistance?.client?.clientLastName}
            </button>{" "}
            received a {assistance?.isPrivate === true && "private "}service.
          </h1>
          <h2>Service Provided: {assistance?.serviceName}</h2>
        </TimelineAssistanceHeaderWrapper>
        {assistance?.notes && <p>Additional Notes: {assistance?.notes}</p>}
        <p>Date: {assistance?.date}</p>
      </TimelineAssistanceCardContentWrapper>
    </TimelineAssistanceCardWrapper>
  );
};

export default TimelineAssistanceCard;
