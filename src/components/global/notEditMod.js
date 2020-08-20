import React from "react";
import PropTypes from "prop-types";
import { faTimesCircle as falFaTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./mod.css";

class Modal extends React.Component {
    render() {
        if (!this.props.show) {
            return null;
        }

        const backdropStyle = {
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            padding: 50
        };

        const modalStyle = {
            backgroundColor: "#fff",
            borderRadius: 5,
            maxWidth: 1000,
            minHeight: 500,
            margin: "0 auto",
            padding: 30
        };

        return (
            <div className="backdrop" style={backdropStyle}>
                <div className="modal" style={modalStyle}>
                    <a onClick={this.props.onClose}>
                        <FontAwesomeIcon icon={falFaTimesCircle} />
                    </a>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default Modal;
