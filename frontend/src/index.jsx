import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./styles.css";

import Footer from "./components/global/footer";
import Nav from "./components/global/nav";

import HomePage from "./views/Home";
import ServiceList from "./views/ServiceList";
import AgencyProfile from "./views/AgencyProfile";
import Login from "./views/Login";
import AgenciesLoggedOut from "./views/AgencyList";
import ClientProfile from "./views/ClientProfile";
import ClientList from "./views/ClientList";

class App extends React.Component {
  render() {
    return (
      <div className="Yeet">
        <Nav />
        <div className="container">
          <div className="LoggedInviews">
            <Route
              exact={true}
              path="/views/ClientList"
              component={ClientList}
            />
            <Route
              exact={true}
              path="/views/ClientProfile"
              component={ClientProfile}
            />
            <Route
              exact={true}
              path="/views/AgencyProfile"
              component={AgencyProfile}
            />
          </div>
          <Route exact={true} path="/" component={HomePage} />
          <Route
            exact={true}
            path="/views/ServiceList"
            component={ServiceList}
          />
          <Route
            exact={true}
            path="/views/AgencyList"
            component={AgenciesLoggedOut}
          />
          <Route exact={true} path="/views/Login" component={Login} />
        </div>
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
