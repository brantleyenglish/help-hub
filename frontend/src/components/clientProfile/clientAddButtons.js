import React from "react";
import Modal from "/components/global/notEditMod.js";
import PropTypes from "prop-types";

class ClientAddButtons extends React.Component {
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
            <div className="addmods">
                <div className="AddNoteMod">
                    <button onClick={this.toggleModal}> Add Note</button>

                    <Modal show={this.state.isOpen} onClose={this.toggleModal}>
                        <div className="AddNote">
                            <h1> Add A Note </h1>
                            <h2>Note Title</h2>
                            <input className="noteTitle" />
                            <br />
                            <h2>Description</h2>
                            <input className="noteDescription" />
                            <br />
                            <button type="submit">Add Note</button>
                        </div>
                    </Modal>
                </div>

                <div className="AddAssistanceMod">
                    <button onClick={this.toggleModal}> Add Assistance</button>

                    <Modal show={this.state.isOpen} onClose={this.toggleModal}>
                        <div className="AddAssistance">
                            <h1>Add Assistance </h1>
                            <h2>Assistance Title</h2>
                            <input className="assistanceTitle" />
                            <br />
                            <h2>Description</h2>
                            <input className="assistanceDescription" />
                            <br />
                            <button type="submit">Add Assistance</button>
                        </div>
                    </Modal>
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

export default ClientAddButtons;
