import React, { useState } from "react";
import ForgotPS from "../loginPage/forgotPassword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import header from "../../images/header.png";
import logo from "../../images/logo.png";

class LoginInput extends React.Component {
  render() {
    return (
      <div
        className="LoginInput"
        style={{
          backgroundImage: `url(${header})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1> Login </h1>
        <div className="credentials">
          <h2> Username: </h2>
          <input className="username" />
          <br />
          <h2> Password: </h2>
          <input className="password" />
          <br />
          <button onClick={this.props.handleLogin}> Login</button>
          <ForgotPS />
        </div>
      </div>
    );
  }
}

export default LoginInput;
