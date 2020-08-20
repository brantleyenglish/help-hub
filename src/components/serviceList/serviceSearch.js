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

class ServiceSearch extends React.Component {
    state = {
        searchQuery: " "
    };

    _onChangeSearch = query => this.setState({ searchQuery: query });

    render() {
        const { searchQuery } = this.state;
        return (
            <div className="service-search">
                <h1> Services </h1>
                <span className="search-container">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input className="searchbar" placeholder="Search for Services" />
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
            </div>
        );
    }
}

export default ServiceSearch;
