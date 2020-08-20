import React from "react";
import ReactDOM from "react-dom";
import ContextProviders from "./context";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";

import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <ContextProviders>
      <App />
    </ContextProviders>
  </BrowserRouter>,
  document.getElementById("root")
);
