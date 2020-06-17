import React, { useState } from "react";
import logo from "../images/logo.png";

class Nav extends React.Component {

    render() {
        return (
            <div className="navity">
                <a id="logo" href="/">
                    <img src={logo} alt="placeholder" style={{ width: 130 }} />
                </a>

                <span>
                    <a href="/pages/servicespg">Services</a>

                    <a href="/pages/mainAgencies"> Agencies </a>

                    <a href="/pages/clientHome" >Client </a>

                    <a href="/pages/login"> Log In </a>

                </span>
            </div>
        );
    }
}
export default Nav;
