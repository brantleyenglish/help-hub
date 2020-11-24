import React from "react";
import TimelineMod from "/components/client/clientprofile/timeline/timelinemod";
import { faHeart as farFaHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Timeline extends React.Component {
    render() {
        return (
            <div className="timeline">
                <div className="iconContainer">
                    <FontAwesomeIcon icon={farFaHeart} size="4x" />
                </div>
                <div className="assistance">
                    <h1>Assistance Title</h1>
                    <p>Description</p>
                </div>
            </div>
        );
    }
}

export default Timeline;
