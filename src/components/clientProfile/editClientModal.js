import React, { Component } from "react";
import Modal from "../global/mod";
import PropTypes from "prop-types";
import { faEdit as fasFaEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ClientModal extends Component {
    constructor(props) {
        super(props);

        this.state = { isOpen: false };
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    render() {
        return (
            <div className="ClientMod">
                <a className="edit" onClick={this.toggleModal}>
                    <FontAwesomeIcon icon={fasFaEdit} />
                </a>

                <Modal show={this.state.isOpen} onClose={this.toggleModal}>
                    <form>
                        <h1> Edit Client Profile</h1>
                        <label>
                            Name:
              <input
                                type="text"
                                name="clientname"
                                value={this.state.clientName}
                                onChange={this.handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            DOB:
              <input type="text" name="test" />
                        </label>
                        <br />
                        <label>
                            Address:
              <input type="text" name="test" />
                        </label>
                        <br />
                        <label>
                            Phone:
              <input type="text" name="test" />
                        </label>
                        <br />
                        <label>
                            County:
              <input type="text" name="test" />
                        </label>
                        <br />
                        <label>
                            Email:
              <input type="text" name="test" />
                        </label>
                        <br />
                        <label>
                            Male:
              <input type="text" name="test" />
                        </label>
                        <br />
                        <label>
                            Ethnicity:
              <input type="text" name="test" />
                        </label>
                        <br />
                        <label>
                            Additional Notes:
              <input type="text" name="test" />
                        </label>
                    </form>
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

export default ClientModal;
