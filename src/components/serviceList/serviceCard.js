import React from "react";
import helphubPlaceholder from "../../images/helphubPlaceholder.png";
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

class ServProf extends React.Component {
    render() {
        return (
            <div className="service-pg">
                <div className="service-list">
                    <div className="service-col-1">
                        <div className="service-card-icon">
                            <img src={helphubPlaceholder} alt="#" />
                            <h1> Agency Title</h1>
                        </div>
                        <h2>Service Name</h2>
                        <p>integre principes eu cum, ne altera mollis prompta duo. Sensibus
                        forensibus sadipscing ius ut, ad omnesque facilisi sententiae vel.
                        Ad qui fugit labore recusabo, ne dolore iriure vel. No qui etiam
                        everti liberavisse. Paulo veritus imperdiet sea te, te utamur
                        vivendum mei, eum at homero eruditi. Vix admodum detraxit
                        disputando in, et labore interesset has, quo ad nostro bonorum
                        constituam. Labitur corpora ex nec, diam bonorum vis te. At modo
                        idque insolens nec, eu per nisl malis labitur. Sed in scripta
                            comprehensam, at vis vide solet dolorem, eam suscipit</p>
                    </div>
                    <div className="service-col-2">
                        <ul>
                            <li style={{ fontSize: 20, textTransform: "uppercase" }}>Contact Info</li>
                            <li>
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    style={{ color: "#B23633", paddingRight: 5 }}
                                /> 555-555-5555
                           </li>
                            <li>
                                <FontAwesomeIcon
                                    icon={faMapMarkerAlt}
                                    style={{ color: "#B23633", paddingRight: 5 }}
                                /> 542 Wiley Parker Rd.
                           </li>
                            <div className="sm-cat">
                                <span className="category-container">
                                    <a><FontAwesomeIcon icon={faHeartbeat} /></a>
                                </span>
                                <span className="category-container">
                                    <a><FontAwesomeIcon icon={faTshirt} /></a>
                                </span>
                                <span className="category-container">
                                    <a><FontAwesomeIcon icon={faUtensils} /></a>
                                </span>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default ServProf;
