import React from "react";
import {
    faHeartbeat,
    faTshirt,
    faUtensils,
    faHome,
    faBookReader,
    faWheelchair,
    faHandsHelping,
    faQuestion,
    faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TimelineMod extends React.Component {
    render() {
        return (
            <div className="timelineMod">
                <a className="assistanceIcon">
                    <FontAwesomeIcon icon={faHeartbeat} />
                </a>
                <div className="leftTime">
                    <h1> Assistance Title</h1>
                    <h2>
                        {" "}
            Description: <p>Asked for $2000 for his next big production</p>
                    </h2>
                </div>
                <h3>
                    {" "}
          Date: <p>3/5/2020</p>
                </h3>
            </div>
        );
    }
}

export default TimelineMod;
