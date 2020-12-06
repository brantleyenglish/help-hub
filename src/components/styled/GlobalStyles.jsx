import { createGlobalStyle } from "styled-components";
import { theme } from "../components/Theme";


const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap');
body {
  /* background: #fff;
  color: #3c3c3c; */
  font-family: "Roboto", serif;
  font-size: 18px;
}

`;

export default GlobalStyle;
