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
    faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import header from "../../images/header.png";

class AHeader extends React.Component {
    render() {
        return (
            <div className="AgencyHeader" style={{
                backgroundImage: `url(${header})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat"
            }}>
                <h1> Agencies </h1>
                <span className="searchContainer">
                    <FontAwesomeIcon icon={faSearch} className="searchIcon" />
                    <input className="searchbar" />
                </span>
                <button className="searchButton">GO
        </button>
                <div className="catbuttons">
                    <div className="cat3">
                        <span className="catcont">
                            <a>
                                <FontAwesomeIcon icon={faHeartbeat} />
                            </a>
                            <p>Health</p>
                        </span>

                        <span className="catcont">
                            <a>
                                <FontAwesomeIcon icon={faTshirt} />
                            </a>
                            <p>Household</p>
                        </span>

                        <span className="catcont">
                            <a>
                                <FontAwesomeIcon icon={faUtensils} />
                            </a>
                            <p>Food</p>
                        </span>

                        <span className="catcont">
                            <a>
                                <FontAwesomeIcon icon={faHome} />
                            </a>
                            <p>Housing</p>
                        </span>

                        <span className="catcont">
                            <a>
                                <FontAwesomeIcon icon={faBookReader} />
                            </a>
                            <p>Education</p>
                        </span>

                        <span className="catcont">
                            <a>
                                <FontAwesomeIcon icon={faWheelchair} />
                            </a>
                            <p>Disability</p>
                        </span>

                        <span className="catcont">
                            <a>
                                <FontAwesomeIcon icon={faHandsHelping} />
                            </a>
                            <p>Abuse</p>
                        </span>

                        <span className="catcont">
                            <a>
                                <FontAwesomeIcon icon={faQuestion} />
                            </a>
                            <p>Others</p>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default AHeader;
