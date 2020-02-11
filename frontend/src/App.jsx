import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GlobalStyles from "./components/styled/GlobalStyles";

import Agency from "./views/Agency";
import AgencyList from "./views/AgencyList";
import Client from "./views/Client";
import ClientList from "./views/ClientList";
import Home from "./views/Home";
import Login from "./views/Login";
import Service from "./views/Service";
import ServiceList from "./views/ServiceList";
import Signup from "./views/Signup";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route path="/clients/:clientId" component={Client} />
        <Route path="/clients" component={ClientList} />
        <Route path="/sign-up" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/agencies/:agencyId/" component={Agency} />
        <Route path="/services/:serviceId/" component={Service} />
        <Route path="/services/" component={ServiceList} />
        <Route path="/agencies/" component={AgencyList} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
