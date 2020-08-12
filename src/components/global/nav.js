import React, { useState } from "react";
import logo from "../../images/logo.png";

class Nav extends React.Component {

    render() {
        return (
            <div className="nav">
                <a id="logo" href="/">
                    <img src={logo} alt="placeholder" style={{ width: 130 }} />
                </a>
                <span>
                    <a href="/views/ServiceList">Services</a>
                    <a href="/views/AgencyList"> Agencies </a>
                    <a href="/views/ClientList" >Clients </a>
                    <a href="/views/Login"> Log In </a>
                </span>
            </div>
        );
    }
}
export default Nav;
