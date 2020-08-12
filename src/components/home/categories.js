import React from "react";
import {
    faHeartbeat,
    faTshirt,
    faUtensils,
    faHome,
    faBookReader,
    faWheelchair,
    faHandsHelping,
    faQuestion
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Categories extends React.Component {
    render() {
        return (
            <div className="home-categories">
                <div className="cat-row-1">
                    <span className="category-container">
                        <a>
                            <FontAwesomeIcon icon={faHeartbeat} />
                        </a>
                        <p>Health</p>
                    </span>

                    <span className="category-container">
                        <a>
                            <FontAwesomeIcon icon={faTshirt} />
                        </a>
                        <p>Household</p>
                    </span>

                    <span className="category-container">
                        <a>
                            <FontAwesomeIcon icon={faUtensils} />
                        </a>
                        <p>Food</p>
                    </span>

                    <span className="category-container">
                        <a>
                            <FontAwesomeIcon icon={faHome} />
                        </a>
                        <p>Housing</p>
                    </span>
                </div>

                <div className="cat-row-2">
                    <span className="category-container">
                        <a>
                            <FontAwesomeIcon icon={faBookReader} />
                        </a>
                        <p>Education</p>
                    </span>

                    <span className="category-container">
                        <a>
                            <FontAwesomeIcon icon={faWheelchair} />
                        </a>
                        <p>Disability</p>
                    </span>

                    <span className="category-container">
                        <a>
                            <FontAwesomeIcon icon={faHandsHelping} />
                        </a>
                        <p>Abuse</p>
                    </span>

                    <span className="category-container">
                        <a>
                            <FontAwesomeIcon icon={faQuestion} />
                        </a>
                        <p>Others</p>
                    </span>
                </div>
            </div>
        );
    }
}

export default Categories;
