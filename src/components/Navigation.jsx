import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/pro-solid-svg-icons";

import styled from "styled-components";

const NavigationWrapper = styled.div`
  display: flex;
  button {
    color: green;
  }
`;
const Navigation = () => {
  return (
    <NavigationWrapper className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/login">About</Link>
      <FontAwesomeIcon icon={faThumbsUp} color="green" />
      {/* <a className="navbar-brand" href="#">
        <img src="images/helphub.png" alt="" />
      </a> */}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link to="/agencies">Agencies</Link>
          </li>
          <li className="nav-item">
            <Link to="/services">Services</Link>
          </li>
          {false ? (
            <></>
          ) : (
              <li className="nav-item">
                <Link to="/login">Log in</Link>
              </li>
            )}
        </ul>
      </div>
    </NavigationWrapper>
  );
};

export default Navigation;
