import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Footer from "./components/global/footer";
import Nav from "./components/global/nav";

import HomePage from "./views/Home";
import ServiceList from "./views/ServiceList";
import AgencyProfile from "./views/AgencyProfile";
import Login from "./views/Login";
import AgencyList from "./views/AgencyList";
import ClientProfile from "./views/ClientProfile";
import ClientList from "./views/ClientList";
import Signup from "./views/Signup";

import ThemeWrapper from "../src/components/Theme";

const AppWrapper = styled.div`
  width: 100%;
`;

const App: React.FC<any> = () => {
  return (
    <ThemeWrapper>
      <AppWrapper>
        <Nav />
        <Switch>
          <Route exact={true} path="/clients" component={ClientList} />
          <Route exact={true} path="/clients/:id" component={ClientProfile} />
          <Route exact={true} path="/services" component={ServiceList} />
          <Route
            exact={true}
            path="/agencies/:agencyId"
            component={AgencyProfile}
          />
          <Route exact={true} path="/agencies" component={AgencyList} />
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/signup" component={Signup} />
          <Route exact={true} path="/" component={HomePage} />
        </Switch>
        <Footer />
      </AppWrapper>
    </ThemeWrapper>
  );
};

export default App;
