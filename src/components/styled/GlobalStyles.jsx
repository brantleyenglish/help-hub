import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  background: #fff;
  color: #3c3c3c;
  font-family: "Roboto", serif;
  font-size: 18px;
}
.btn-primary{
    background-color: #c1272d;
    border: #c1272d;
    &:hover{
    background-color: #a32226;
    }
}

/* ----------------------------------
            NAVBAR STYLES
---------------------------------- */
.navbar {
    background: #fff;
    border-radius: 0;
    min-height: 60px;
}
.navbar-nav a {
    color: #b8b8b8;
    letter-spacing: .2em;
    margin-left: 32px;
    padding: 20px !important;
    text-transform: uppercase;
}
.navbar-nav .nav-item a:before {
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 100%;
    height: 2px;
    margin-bottom: 10px;
    background: #b8b8b8;
    content: '';
    transition: all 100ms ease;
    opacity: 0;
}
.navbar-nav .nav-item a {
    position: relative;
    font-weight: bold;
}
.navbar-nav .nav-item a:before {
    bottom: 0;
    height: 2px;
    opacity: 1;
}
.navbar-nav .active a {
    color: #c1272d;
    font-weight: bold;
    position: relative;
}
.navbar-nav .active a:before {
    bottom: 0;
    height: 2px;
    background: #c1272d;
    opacity: 1;
}  
.navbar-toggle {
    background: #eee;
    margin-top: 12px;
}
.navbar-toggle .icon-bar {
    background: #aaa;
}
.navbar-brand img {
    width: 200px;
}

/* ----------------------------------
            JUMBOTRON STYLES
---------------------------------- */
.jumbotron{ 
text-align: center;
  color: #c1272d;
  background: url(images/helphub-pattern.png) no-repeat center center;
  background-size: cover;
}
.header-message>h1 {
    font-weight: bold;
    text-transform: uppercase;
    margin: 0;
    text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
    font-size: 3em;
    letter-spacing: .05em;
}
.header-message>h3 {
    text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
    font-weight: 400;
}

/* ----------------------------------
        ABOUT SECTION STYLES
---------------------------------- */
.about-section {
    padding: 5rem 5rem;
}
.about-section h2{
    text-transform: uppercase;
    font-weight: bold;
    color: #c1272d;
}
.about-section p {
    font-weight: 300;
}
.unitedway-logo{
    padding: 20px;
}
  

`;

export default GlobalStyle;
