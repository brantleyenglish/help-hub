import React from "react";
import helphubPlaceholder from "../../images/helphubPlaceholder.png";
import {
    faHeartbeat,
    faTshirt,
    faUtensils,
    faHome,
    faBookReader,
    faWheelchair,
    faHandsHelping,
    faQuestion,
    faSearch,
    faPhone,
    faGlobe
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AgencyMod extends React.Component {
    render() {
        return (
            <div className="agencyMod">
                <div className="box">
                    <img
                        src={helphubPlaceholder}
                        alt="agencylogo"
                        style={{ float: "left", borderRadius: 100 }}
                    />
                    <h1>Name</h1>
                    <br />
                    <h2> DESCRIPTION</h2>
                    <p>
                        unum litva eif norem di estens ara qivna mansy tulintvaunum litva
                        unum litva eif norem di estens eif norem di estens garren jusngle
                        eplenfa foeis painfe quie
          </p>
                    <p>
                        <FontAwesomeIcon icon={faPhone} style={{ color: "#B23633" }} />{" "}
            555-555-5555
          </p>
                    <p>
                        <FontAwesomeIcon icon={faGlobe} style={{ color: "#B23633" }} />{" "}
            www.website.com
          </p>

                    <div className="cat3">
                        <span className="catcont">
                            <a>
                                <FontAwesomeIcon icon={faHeartbeat} />
                            </a>
                        </span>

                        <span className="catcont">
                            <a>
                                <FontAwesomeIcon icon={faTshirt} />
                            </a>
                        </span>

                        <span className="catcont">
                            <a>
                                <FontAwesomeIcon icon={faUtensils} />
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default AgencyMod;
