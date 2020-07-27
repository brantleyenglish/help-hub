import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AgencyProfile from "./views/AgencyProfile";
import AgencyList from "./views/AgencyList";
import ClientProfile from "./views/ClientProfile";
import ClientList from "./views/ClientList";
import HomePage from "./views/Home";
import Login from "./views/Login";
import ServiceList from "./views/ServiceList";
import Signup from "./views/Signup";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route path="/clients/:clientId" component={ClientProfile} />
        <Route path="/clients" component={ClientList} />
        <Route path="/sign-up" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/agencies/:agencyId/" component={AgencyProfile} />
        <Route path="/services/" component={ServiceList} />
        <Route path="/agencies/" component={AgencyList} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
};

export default App;
