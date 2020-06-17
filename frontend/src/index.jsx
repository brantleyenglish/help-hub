import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "styles.css";

import Foot from "/components/global/Foot";
import Nav from "/components/global/Nav";

import HomePage from "/views/home";
import SErv from "/views/servicespg";
import Agenciespg from "/views/agenciesprofile";
import LogIN from "/views/login";
import AgenciesLoggedOut from "/views/mainAgencies";
import ClientPg from "/views/client";
import ClientHome from "/views/clientHome";

class App extends React.Component {

    render() {
        return (
            <div className="Yeet">
                <Nav />
                <div className="container">
                    <div className="LoggedInviews">
                        <Route exact={true} path="/views/client" component={ClientPg} />
                        <Route exact={true} path="/views/agencies" component={Agenciespg} />
                    </div>
                    <Route exact={true} path="/" component={HomePage} />
                    <Route exact={true} path="/views/servicespg" component={SErv} />
                    <Route
                        exact={true}
                        path="/views/mainAgencies"
                        component={AgenciesLoggedOut}
                    />
                    <Route exact={true} path="/views/clientHome" component={ClientHome} />
                    <Route exact={true} path="/views/login" component={LogIN} />
                </div>
                <Foot />
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
