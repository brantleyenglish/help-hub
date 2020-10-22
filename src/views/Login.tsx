import React from "react";
import LoginInput from "../components/loginPage/loginForm";
import SignUp from "../components/loginPage/signin";

const Login = () => {
  const [nav, setNav] = React.useState<any>(null);
  var checkURL = window.location.href.indexOf("#signup");
  if (checkURL < 0) {
    return (
      <div className="loginpg">
        <LoginInput handleLogin={() => console.log("login")} value={nav} />
      </div>
    );
  } else {
    return (
      <div className="loginpg">
        <LoginInput handleLogin={() => console.log("login")} value={nav} />
        <SignUp />
      </div>
    );
  }
};

export default Login;
