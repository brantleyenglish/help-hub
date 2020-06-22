import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./components/Routes";

import { auth } from "./utils/firebase";

import GlobalStyles from "./components/styled/GlobalStyles";

import Agency from "./views/Agency";
import AgencyList from "./views/AgencyList";
import Client from "./views/Client";
import ClientList from "./views/ClientList";
import Home from "./views/Home";
import Service from "./views/Service";
import ServiceList from "./views/ServiceList";

import SignUp from "./views/SignUp";
import Login from "./views/Login";

const App = () => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    });
  }, []);

  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute
          path="/dashboard"
          authenticated={authenticated}
          component={AgencyList}
        />
        <PublicRoute path="/signup" component={SignUp} />
        <PublicRoute path="/login" component={Login} />
        {/* <Route path="/clients/:clientId" component={Client} />
        <Route path="/clients" component={ClientList} />
        <Route path="/sign-up" component={Signup} />
        <Route path="/agencies/:agencyId/" component={Agency} />
        <Route path="/services/:serviceId/" component={Service} />
        <Route path="/services/" component={ServiceList} />
        <Route path="/agencies/" component={AgencyList} /> */}
      </Switch>
    </Router>
  );
};

export default App;
