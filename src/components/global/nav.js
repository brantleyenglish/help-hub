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
                    <a href="/services">Services</a>
                    <a href="/agencies"> Agencies </a>
                    <a href="/clients" >Clients </a>
                    <a href="/login"> Log In </a>
                </span>
            </div>
        );
    }
}
export default Nav;
