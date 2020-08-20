import React from "react";
import AgencyModal from "./agencyModal.js";
import { hours } from "./agencyInfo.js";

import { faPhone as fasFaPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope as fasFaEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ServiceMod extends React.Component {
    render() {
        return (
            <div className="service">
                <div className="service-col-1">
                    <ul>
                        <a
                            style={{
                                fontSize: 25,
                                color: "#B23633",
                                fontWeight: "700",
                                paddingBottom: 10
                            }}>
                            SERVICE TITLE
            </a>
                        <li>
                            vivendum mei, eum at homero eruditi. Vix admodum detraxit
                            disputando in, et labore interesset has, quo ad nostro bonorum
                            constituam. Labitur corpora ex nec, diam bonorum vis te. At modo
                            idque insolens nec, eu per nisl malis labitur. Sed in scripta
                            comprehensam, at vis vide solet dolorem, eam suscipit
            </li>
                        <li> Hours: {hours}</li>
                        <li style={{ color: "#b23633" }}> Appointment Only</li>
                    </ul>
                </div>

                <div className="service-col-2">
                    <ul>
                        <li style={{ fontSize: 20 }}>
                            CONTACT INFO:
              <span className="editButton">
                                <AgencyModal show={this.props.isLoggedIn} />
                            </span>
                        </li>
                        <li>
                            <FontAwesomeIcon
                                icon={fasFaPhone}
                                style={{ color: "#B23633", paddingRight: 5 }}
                            />{" "}
              333-402-2229
            </li>
                        <li>
                            <FontAwesomeIcon
                                icon={fasFaEnvelope}
                                style={{ color: "#B23633", paddingRight: 5 }}
                            />{" "}
                            <a href="mailto:name@mydomain.com" className="emailLink">
                                example@email.com
              </a>
                        </li>
                        <li>
                            {" "}
              Info: Sed in scripta comprehensam, at vis vide solet dolorem, eam
              suscipit
            </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default ServiceMod;
