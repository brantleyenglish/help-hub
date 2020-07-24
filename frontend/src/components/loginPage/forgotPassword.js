import React from "react";
import Modal from "../global/mod";
import PropTypes from "prop-types";

class ForgotPS extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isOpen: false };
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <div className="ForgotPassMod">
                <a onClick={this.toggleModal}>Forgot Password</a>

                <Modal show={this.state.isOpen} onClose={this.toggleModal}>
                    <div className="Forgotps">
                        <h1> Forgot Password </h1>
                        <h2>Username:</h2>
                        <input className="username" />
                        <br />
                        <h2>Email:</h2>
                        <input className="email" />
                        <br />
                        <button>Send Link to Reset Password</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default ForgotPS;
