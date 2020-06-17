import React from "react";
import {
    faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import header from "/components/images/header.png";

export default class ClientSearch extends React.Component {
    render() {
        return (
            <div className="clientsearch" style={{
                backgroundImage: `url(${header})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat"
            }}>
                <h1> Clients</h1>
                <span className="searchContainer">
                    <FontAwesomeIcon icon={faSearch} className="searchIcon" />
                    <input className="searchbar" />
                </span>
                <button className="searchButton">GO</button>
                <br />
                <a>Advanced Search</a>
            </div>
        );
    }
}
