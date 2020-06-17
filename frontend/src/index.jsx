import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./styles.css";

import Foot from "./components/global/footer";
import Nav from "./components/global/nav";

import HomePage from "./views/Home";
import SErv from "./views/ServiceList";
import Agenciespg from "./views/Agency";
import LogIN from "./views/Login";
import AgenciesLoggedOut from "./views/AgencyList";
import ClientPg from "./views/Client";
import ClientHome from "./views/ClientList";

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
