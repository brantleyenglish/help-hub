import React from "react";

import { faHeart as farFaHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Messages extends React.Component {
    render() {
        return (
            <div className="timeline">
                <div className="iconContainer">
                    <FontAwesomeIcon icon={farFaHeart} size="4x" />
                </div>
                <div className="assistance">
                    <h1>MESSAGES</h1>
                    <p>Description</p>
                </div>
            </div>
        );
    }
}

export default Messages;
