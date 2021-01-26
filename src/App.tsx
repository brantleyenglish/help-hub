import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import styled from "styled-components";
import ThemeWrapper from "../src/components/Theme";
import Footer from "./components/global/footer";
import Nav from "./components/global/nav";
import AgencyList from "./views/AgencyList";
import AgencyProfile from "./views/AgencyProfile";
import ClientList from "./views/ClientList";
import ClientProfile from "./views/ClientProfile";
import HomePage from "./views/Home";
import Login from "./views/Login";
import ServiceList from "./views/ServiceList";
import Signup from "./views/Signup";

const AppWrapper = styled.div`
  width: 100%;
`;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC<any> = () => {
  return (
    <ThemeWrapper>
      <ScrollToTop />
      <AppWrapper>
        <Nav />
        <Switch>
          <Route exact={true} path="/clients" component={ClientList} />
          <Route
            exact={true}
            path="/clients/:clientId"
            component={ClientProfile}
          />
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
