import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ children, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          { children }
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export const PublicRoute = ({ children, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? { children } : <Redirect to="/dashboard" />
      }
    />
  );
};
