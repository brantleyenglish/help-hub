import React from "react";
import { faFolderPlus as fasFaFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileMod from "/components/client/clientprofile/files/filemod";
import Modal from "/components/global/notEditMod.js";
import PropTypes from "prop-types";

class Files extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            files: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 4 }]
        };
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    handleDelete = fileId => {
        const files = this.state.files.filter(f => f.id !== fileId);
        this.setState({ files });
    };


    render() {
        return (
            <div className="files">
                <div className="filebody">
                    <a className="fileIcon" onClick={this.toggleModal}>
                        <FontAwesomeIcon icon={fasFaFolderPlus} />
                    </a>
                    <Modal show={this.state.isOpen} onClose={this.toggleModal}>
                        <div className="addFile">
                            <h1> Add a File </h1>
                            <h2>File Name</h2>
                            <input className="filename" />
                            <br />
                            <h2>Important Details</h2>
                            <input className="filedetails" />
                            <br />
                            <button>Add File</button>
                        </div>
                    </Modal>
                </div>
                <div className="bigFiles">
                    {this.state.files.map(files => (
                        <FileMod
                            key={files.id}
                            onDelete={this.handleDelete}
                            id={files.id}
                        />
                    ))}
                </div>
        .
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default Files;
