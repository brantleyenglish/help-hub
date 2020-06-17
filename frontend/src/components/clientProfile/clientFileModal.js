import React from "react";
import {
    faFileAlt as fasFaFileAlt,
    faRubleSign
} from "@fortawesome/free-solid-svg-icons";
import { faEdit as fasFaEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt as farFaTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "/components/global/mod.js";
import PropTypes from "prop-types";

class FileMod extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            fileName: "something.pdf",
            fileDetails:
                "haec sunt additional notas: Ego genus vastationis tempus est"
        };
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
            <div className="fileMod">
                <h1>
                    {" "}
                    <a className="fileCorner">
                        <FontAwesomeIcon icon={fasFaFileAlt} />
                    </a>
                    {this.state.fileName}
                </h1>

                <h2>
                    {" "}
          Important Details: <p>{this.state.fileDetails}</p>
                </h2>
                <div className="trashy">
                    <div className="editFile">
                        <a onClick={this.toggleModal}>
                            <FontAwesomeIcon icon={fasFaEdit} />
                        </a>
                        <Modal show={this.state.isOpen} onClose={this.toggleModal}>
                            <div className="addFile">
                                <h1> Edit File </h1>
                                <h2>File Name</h2>
                                <input
                                    className="filename"
                                    name="fileName"
                                    value={this.state.fileName}
                                    onChange={this.handleChange}
                                />
                                <br />
                                <h2>Important Details</h2>
                                <input
                                    className="filedetails"
                                    name="fileDetails"
                                    value={this.state.fileDetails}
                                    onChange={this.handleChange}
                                />
                                <br />
                                <button onClick={this.handleChange}>Apply Edits</button>
                            </div>
                        </Modal>
                    </div>
                    <a onClick={() => this.props.onDelete(this.props.id)}>
                        <FontAwesomeIcon icon={farFaTrashAlt} />
                    </a>
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

export default FileMod;
