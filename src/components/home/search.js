import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Search extends React.Component {
    render() {
        return (
            <div className="home-search">
                <h1> Find Help, Get Help.</h1>
                <h2>Search dozens of agencies and their services.</h2>
                <span className="search-container">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input className="searchbar" placeholder="Search for Services or Agencies" />
                </span>
                <button className="search-button">GO</button>
            </div>
        );
    }
}
