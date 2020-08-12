import React from "react";
import {
    faHeartbeat,
    faTshirt,
    faUtensils,
    faHome,
    faBookReader,
    faWheelchair,
    faHandsHelping,
    faQuestion,
    faSearch,
    faPhone,
    faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ClientProf extends React.Component {
    render() {
        return (
            <div className="bigClientDiv">
                <div className="clientholder">
                    <div className="left">
                        <h1>John Smith </h1>
                        <h2>
                            DOB: <p>3/17/1968</p>
                        </h2>
                        <h2>
                            {" "}
                            <FontAwesomeIcon icon={faPhone} />
                            <p>555-555-5555</p>
                        </h2>
                        <h2>
                            <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                            <p>
                                541 Wiley Parker Rd. <br /> Jackson, TN 38305
              </p>
                        </h2>
                    </div>
                    <br />
                    <div className="right">
                        <h2>
                            {" "}
              Gender: <p>Male</p>
                        </h2>
                        <h2>
                            {" "}
              Ethnicity: <p>Caucasian</p>{" "}
                        </h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClientProf;
