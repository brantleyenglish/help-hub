import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../components/Theme";
import UnitedWayLogo from "../../images/uw_logo.png";

const NavWrapper = styled.div`
background-color: #f2f2f2;
display: flex;
justify-content: left;
align-items: center;`;

const LogoWrapper = styled.img`
padding: 20px;
`;

const NavLinkWrapper = styled.a`
margin-left: 25px;
  margin-right: 25px;
  padding-top: 1vw;
  padding-bottom: 0.3vw;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
  font-size: 15px;
  color: #999999;
  text-transform: uppercase;
  border-bottom: 2px ${theme.colors.lightBlue} solid;
  &:hover{
    color: #333333;
  };
  `;
const NavSpanWrapper = styled.span`
  position: absolute;
  right: 0;`;

const Nav = () => {
    return (
        <NavWrapper>
            <a href="/">
                <img src={UnitedWayLogo} alt="placeholder" style={{ width: 300, padding: 15, paddingLeft: 30 }} />
            </a>
            <NavSpanWrapper>
                <NavLinkWrapper><a href="/services">Services</a></NavLinkWrapper>
                <NavLinkWrapper><a href="/agencies"> Agencies </a></NavLinkWrapper>
                <NavLinkWrapper><a href="/clients" >Clients </a></NavLinkWrapper>
                <NavLinkWrapper><a href="/login"> Log In </a></NavLinkWrapper>
            </NavSpanWrapper>
        </NavWrapper>
    );
}

export default Nav;
