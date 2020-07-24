import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

<<<<<<< HEAD
import "./styles.css";
=======
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
>>>>>>> 5846fe0c73c2da28b6364e58e4eaba3073a43197

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
                        <Route exact={true} path="/views/ClientList" component={ClientList} />
                        <Route exact={true} path="/views/ClientProfile" component={ClientProfile} />
                        <Route exact={true} path="/views/AgencyProfile" component={AgencyProfile} />
                    </div>
                    <Route exact={true} path="/" component={HomePage} />
                    <Route exact={true} path="/views/ServiceList" component={ServiceList} />
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
