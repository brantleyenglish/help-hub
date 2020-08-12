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

class AgencySearch extends React.Component {
    render() {
        return (
            <div className="agency-search">
                <h1> Agencies </h1>
                <span className="search-container">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input className="searchbar" placeholder="Search for Agencies" />
                </span>
                <button className="search-button">GO</button>
                <div className="catbuttons">
                    <div className="search-categories">
                        <span className="category-container">
                            <a>
                                <FontAwesomeIcon icon={faHeartbeat} />
                            </a>
                            <p>Health</p>
                        </span>

                        <span className="category-container">
                            <a>
                                <FontAwesomeIcon icon={faTshirt} />
                            </a>
                            <p>Household</p>
                        </span>

                        <span className="category-container">
                            <a>
                                <FontAwesomeIcon icon={faUtensils} />
                            </a>
                            <p>Food</p>
                        </span>

                        <span className="category-container">
                            <a>
                                <FontAwesomeIcon icon={faHome} />
                            </a>
                            <p>Housing</p>
                        </span>

                        <span className="category-container">
                            <a>
                                <FontAwesomeIcon icon={faBookReader} />
                            </a>
                            <p>Education</p>
                        </span>

                        <span className="category-container">
                            <a>
                                <FontAwesomeIcon icon={faWheelchair} />
                            </a>
                            <p>Disability</p>
                        </span>

                        <span className="category-container">
                            <a>
                                <FontAwesomeIcon icon={faHandsHelping} />
                            </a>
                            <p>Abuse</p>
                        </span>

                        <span className="category-container">
                            <a>
                                <FontAwesomeIcon icon={faQuestion} />
                            </a>
                            <p>Others</p>
                        </span>
                    </div>
                </div>
            </div >
        );
    }
}

export default AgencySearch;
