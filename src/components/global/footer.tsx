import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../components/Theme";
import { useAuth } from "../../context/AuthContext";


const FooterWrapper = styled.div`
  display: flex;
  padding: 1.5vw;
  background-color: ${theme.colors.blue};
  justify-content: center;
  align-items: center;
  color: ${theme.colors.white};
  & a {
    margin-left: 1.5vw;
    margin-right: 1.5vw;
    color: ${theme.colors.white};
  }
  & a:hover {
    color: ${theme.colors.lightBlue};
  }
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    a{
      margin: 10px;
    }
   }
`;

const Footer = () => {
  const { user } = useAuth();

  return (
    <FooterWrapper>
      <Link to="/">Home</Link>
      <Link to="/services">Services</Link>
      <Link to="/agencies">Agencies</Link>
      {user && (
        <Link to="/clients">Clients</Link>
      )}
      <a href="https://uwwtn-helphub.on.spiceworks.com/portal">Request Tech Support</a>
      {user && (
        <a href="/faq">FAQ</a>
      )}
    </FooterWrapper>
  );
};

export default Footer;
