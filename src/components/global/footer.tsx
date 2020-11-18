import React from "react";
import styled from "styled-components";
import { theme } from "../../components/Theme";


const FooterWrapper = styled.div`
display: flex;
padding: 1.5vw;
background-color: ${theme.colors.grayLight};
justify-content: center;
align-items: center;
color: ${theme.colors.gray};
& a{
    margin-left: 1.5vw;
    margin-right: 1.5vw;
};
& a:hover{
    color: ${theme.colors.blue};
};
`;

const Footer = () => {
    return (
        <FooterWrapper>
            <a href="/">HelpHub</a>
            <p>᛫</p>
            <a href="/pages/servicespg">Services</a>
            <p>᛫</p>
            <a href="/pages/mainAgencies">Agencies</a>
            <p>᛫</p>
            <a href="/pages/clientHome">Clients</a>
            <p>᛫</p>
            <a href="/pages/agencies">Agency Profile</a>
            <p>᛫</p>
            <a href="/">Log Out</a>
        </FooterWrapper>
    );
}


export default Footer;
