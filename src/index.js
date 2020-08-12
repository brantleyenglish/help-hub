import React from "react";
import ReactDOM from "react-dom";
import ContextProviders from "./context";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles.css";

import App from "./App";

ReactDOM.render(
  <Router>
    <ContextProviders>
      <App />
    </ContextProviders>
  </Router>,
  document.getElementById("root")
);
