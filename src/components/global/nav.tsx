import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../components/Theme";
import UnitedWayLogo from "../../images/uw_logo.png";

const NavWrapper = styled.div`
  background-color: #f2f2f2;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const LogoWrapper = styled.img`
  padding: 20px;
`;

const NavLinkWrapper = styled.div`
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
  &:hover {
    color: #333333;
  }
`;
const NavSpanWrapper = styled.span`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: row;
`;

const Nav = () => {
  return (
    <NavWrapper>
      <Link to="/">
        <img
          src={UnitedWayLogo}
          alt="placeholder"
          style={{ width: 300, padding: 15, paddingLeft: 30 }}
        />
      </Link>
      <NavSpanWrapper>
        <Link to="/services">
          <NavLinkWrapper>Services</NavLinkWrapper>
        </Link>
        <Link to="/agencies">
          <NavLinkWrapper>Agencies</NavLinkWrapper>
        </Link>
        <Link to="/clients">
          <NavLinkWrapper>Clients</NavLinkWrapper>
        </Link>
        <Link to="/login">
          <NavLinkWrapper>Log In</NavLinkWrapper>
        </Link>
      </NavSpanWrapper>
    </NavWrapper>
  );
};

export default Nav;
