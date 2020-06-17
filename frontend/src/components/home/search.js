import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import header from "../../images/header.png";

export default class Search extends React.Component {
    render() {
        return (
            <div
                className="search"
                style={{
                    backgroundImage: `url(${header})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <h1> Stop it, Get Some Help</h1>
                <h2>Search dozens of agencies and their services.</h2>
                <span className="searchContainer">
                    <FontAwesomeIcon icon={faSearch} className="searchIcon" />
                    <input className="searchbar" />
                </span>
                <button className="searchButton">GO</button>
            </div>
        );
    }
}
