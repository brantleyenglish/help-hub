import React, { Component } from "react";
import Modal from "../global/mod.js";

import { faPenSquare as fasFaPenSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AgencyModal extends Component {
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
        if (!this.props.show) {
            return null;
        }

        return (
            <div className="AgencyMod">
                <a onClick={this.toggleModal} style={{ cursor: "pointer" }}>
                    <FontAwesomeIcon icon={fasFaPenSquare} color="#B23633" />
                </a>

                <Modal show={this.state.isOpen} onClose={this.toggleModal}>
                    <form>
                        <label>
                            Test Field:
              <input type="text" name="test" />
                        </label>
                        <br />
                        <label>
                            Test Field:
              <input type="text" name="test" />
                        </label>
                        <br />
                        <label>
                            Test Field:
              <input type="text" name="test" />
                        </label>
                        <br />
                        <label>
                            Test Field:
              <input type="text" name="test" />
                        </label>
                        <br />
                        <label>
                            Test Field:
              <input type="text" name="test" />
                        </label>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default AgencyModal;
