import React from "react";

class SignUp extends React.Component {
    render() {
        return (
            <div className="SignupInput">
                <h1> Sign Up </h1>
                <div className="credentials">
                    <h2>Agency Name: </h2>
                    <input className="aName" />
                    <br />
                    <h2> Email: </h2>
                    <input className="email" />
                    <br />
                    <h2>Password: </h2>
                    <input className="password" />
                    <br />
                    <h2> Confirm Password: </h2>
                    <input className="confpass" />
                    <br />
                    <button> Signup</button>
                </div>
            </div>
        );
    }
}

export default SignUp;
