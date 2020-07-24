import React from "react";
import {
    faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import header from "../../images/header.png";

export default class ClientSearch extends React.Component {
    render() {
        return (
            <div className="client-search" style={{
                backgroundImage: `url(${header})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat"
            }}>
                <h1> Clients</h1>
                <span className="search-container">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input className="searchbar" placeholder="Search for Clients" />
                </span>
                <button className="search-button">GO</button>
                <br />
                <a>Advanced Search</a>
            </div>
        );
    }
}
