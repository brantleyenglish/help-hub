import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAgency } from "../../context/AgencyContext";
import { useAuth } from "../../context/AuthContext";
import UnitedWayLogo from "../../images/uw_logo.png";
import { theme } from "../Theme";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HHPlaceholder from "../../images/helphubPlaceholder.png";
import { usePublicData } from "src/context/PublicContext";



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

const NavLinkButton = styled.div`
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
  cursor: pointer;
  &:hover {
    color: #333333;
  }
`;

const ProfileNavLinkWrapper = styled.div`
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
  align-items: center;
  &:hover {
    color: #333333;
  }
  & img{
width: 30px;
height: 30px;
border-radius: 100%;
margin: 0;
padding: 0;
margin-right: 10px;
  } 
`;
const NavSpanWrapper = styled.span<{ menu: 'topnav' | 'hamburgerClose' | `hamburgerOpen`; }>`

  ${(p) => p?.menu === 'topnav' && 'display: flex; flex-direction: row; position: absolute; right: 0; .hamburgerSvg{display:none;}.closeSvg{display:none;}'};
  ${(p) => p?.menu === 'hamburgerClose' && '.closeSvg{display:none;}.hamburgerSvg{display:flex; align-items:center;cursor: pointer;padding: 20px; font-size: 25px;} .link{display:none;}'};
  ${(p) => p?.menu === 'hamburgerOpen' && '.link{display: flex; text-align: right; padding-top: 10px; flex-direction: column;} .hamburgerSvg{display:none;}.closeSvg{display:flex; align-items:center;cursor: pointer;padding: 20px; font-size: 25px;}'};

`;

const Nav = () => {
  const { user, logoutUser } = useAuth();
  const { agency } = useAgency();

  const [navigationState, setNavigationState] = React.useState<'topnav' | 'hamburgerClose' | `hamburgerOpen`>(window.innerWidth > 1100 ? 'topnav' : 'hamburgerClose');

  const toggleHamburger = () => {
    if (navigationState === 'hamburgerOpen') {
      setNavigationState('hamburgerClose');
    } else {
      setNavigationState('hamburgerOpen');
    }
  }

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1100) {
        setNavigationState('topnav');
      } else {
        setNavigationState('hamburgerClose');
      }
    });
  }, [])

  return (
    <NavWrapper>
      <Link to="/">
        <img
          src={UnitedWayLogo}
          alt="placeholder"
          style={{ width: 300, padding: 15, paddingLeft: 30 }}
        />
      </Link>
      <NavSpanWrapper menu={navigationState}>
        <a className="closeSvg" onClick={toggleHamburger}>
          <FontAwesomeIcon icon={faTimes} style={{ color: "#0e4680" }} />
        </a>
        {user && (
          <Link className="link" to={`/agencies/${user?.uid}`} key={user?.uid}>
            <ProfileNavLinkWrapper>
              <img
                src={agency?.profileUrl ? agency?.profileUrl : HHPlaceholder}
              />
            Dashboard
            </ProfileNavLinkWrapper>
          </Link>
        )}
        <Link className="link" to="/services">
          <NavLinkWrapper>Services</NavLinkWrapper>
        </Link>
        <Link className="link" to="/agencies">
          <NavLinkWrapper>Agencies</NavLinkWrapper>
        </Link>
        {user && (
          <Link className="link" to="/clients">
            <NavLinkWrapper>Clients</NavLinkWrapper>
          </Link>
        )}
        {!user && (
          <Link className="link" to="/login">
            <NavLinkWrapper>Log In</NavLinkWrapper>
          </Link>
        )}

        {user && <NavLinkButton className="link" onClick={logoutUser}>Log out</NavLinkButton>}
        <a className="hamburgerSvg" onClick={toggleHamburger}>
          <FontAwesomeIcon icon={faBars} style={{ color: "#0e4680" }} />
        </a>

      </NavSpanWrapper>
    </NavWrapper>
  );
};

export default Nav;
