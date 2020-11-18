import { faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ClientCard: React.FC<any> = ({ client }) => {
  return (
    <div className="bigClientDiv">
      <div className="clientholder">
        <div className="left">
          <h1>{`${client?.clientFirstName} ${client?.clientLastName}`}</h1>
          <h2>
            DOB: <p>{client?.dob}</p>
          </h2>
          <h2>
            <FontAwesomeIcon icon={faPhone} />
            <p>{client?.phone}</p>
          </h2>
          <h2>
            <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
            <p>{`${client?.address} ${client?.city}, TN ${client?.zip}`}</p>
          </h2>
        </div>
        <br />
        <div className="right">
          <h2>Gender: {client?.gender}</h2>
          <h2>Ethnicity: {client?.ethnicity}</h2>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
