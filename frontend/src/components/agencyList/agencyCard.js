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
    faGlobe
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class AgencyCard extends React.Component {
    render() {
        return (
            <div className="agency-card">
                <img src={helphubPlaceholder} alt="agencylogo" />
                <h1>Name</h1>
                <p>unum litva eif norem di estens ara qivna mansy tulintvaunum litva
                unum litva eif norem di estens eif norem di estens garren jusngle
                    eplenfa foeis painfe quie</p>
                <p><FontAwesomeIcon icon={faPhone} style={{ color: "#B23633" }} />{" "} 555-555-5555</p>
                <p><FontAwesomeIcon icon={faGlobe} style={{ color: "#B23633" }} />{" "} www.website.com</p>
                <div className="category-tags">
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
            </div >
        );
    }
}

export default AgencyCard;
