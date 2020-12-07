import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../components/Theme";

const FooterWrapper = styled.div`
  display: flex;
  padding: 1.5vw;
  background-color: ${theme.colors.grayLight};
  justify-content: center;
  align-items: center;
  color: ${theme.colors.gray};
  & a {
    margin-left: 1.5vw;
    margin-right: 1.5vw;
    color: ${theme.colors.gray};
  }
  & a:hover {
    color: ${theme.colors.blue};
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Link to="/">HelpHub</Link>
      <p>᛫</p>
      <Link to="/services">Services</Link>
      <p>᛫</p>
      <Link to="/agencies">Agencies</Link>
      <p>᛫</p>
      <Link to="/clients">Clients</Link>
      <p>᛫</p>
      <Link to="/">Log Out</Link>
    </FooterWrapper>
  );
};

export default Footer;
