import React from "react";
import LoginInput from "../components/loginPage/loginForm";
import SignUp from "../components/loginPage/signin";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nav: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin() {
    this.setState({
      nav: true,
    });
    console.log("working", this.state.nav);
  }

  render() {
    const x = this.state.nav;

    var checkURL = window.location.href.indexOf("#signup");
    //debug, remove comments to test
    //var checkURL = "#signup";

    if (checkURL < 0) {
      return (
        <div className="loginpg">
          <LoginInput handleLogin={this.handleLogin} value={this.state.nav} />
        </div>
      );
    } else {
      return (
        <div className="loginpg">
          <LoginInput handleLogin={this.handleLogin} value={this.state.nav} />
          <SignUp />
        </div>
      );
    }
  }
}

export default Login;
