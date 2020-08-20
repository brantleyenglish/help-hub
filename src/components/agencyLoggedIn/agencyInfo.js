import React from "react";
import header from "../../images/header.png";
import { faPhoneAlt as fasFaPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faHome as fasFaHome } from "@fortawesome/free-solid-svg-icons";
import { faGlobe as fasFaGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import helphubPlaceholder from "../../images/helphubPlaceholder.png";

const img =
    "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/5436/goose-clipart-medium.png";
export const hours = "Monday-Friday  8am-8pm";

class AgencyInfo extends React.Component {
    render() {
        return (
            <div
                className="AgEnCy"
                style={{
                    backgroundImage: `url(${header})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat"
                }}>
                <div className="lefty">
                    <img src={helphubPlaceholder} alt="agencylogo" />
                    <h1 id="agencyName">Agency Name</h1>
                    <h2>
                        <FontAwesomeIcon icon={fasFaPhoneAlt} />
                        <p> 555-555-555</p>
                    </h2>
                    <h2>
                        <FontAwesomeIcon icon={fasFaGlobe} /> <p>www.examplewebsite.com</p>
                    </h2>
                    <h2>
                        <p>
                            Vias enim quae sunt ad aliquid unitum populus in civitatem. Sunt
                            acquirendi hoc site ut semita ab arce quae ope agatur, innovation
                            tu scis. Ut auxilium alumni cum saturavi
            </p>
                    </h2>
                    <h2>
                        <FontAwesomeIcon icon={fasFaHome} />{" "}
                        <p>
                            541 Wiley Parker Rd. <br />
              Jackson, TN 38305
            </p>
                    </h2>
                </div>

                <div className="righty">
                    <h2>
                        Hours: <p>{hours}</p>
                    </h2>
                    <h2>
                        Counties:<p>Madison, Gibson, Chester, Fayette</p>
                    </h2>
                </div>
            </div>
        );
    }
}

export default AgencyInfo;
