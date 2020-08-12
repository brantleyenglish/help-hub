import React from "react";
import ClientModal from "./editClientModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import header from "../../images/header.png";

class ClientHd extends React.Component {
    render() {
        return (
            <div
                className="clientHd"
                style={{
                    backgroundImage: `url(${header})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat"
                }}>
                <div className="clientRight">
                    <h1>John Smith </h1>
                    <h2>
                        DOB: <p>3/17/1968</p>
                    </h2>
                    <h2>
                        Address:{" "}
                        <p>
                            541 Wiley Parker Rd. <br /> Jackson, TN 38305
            </p>
                    </h2>
                    <h2>
                        phone: <p>555-555-555</p>
                    </h2>
                    <h2>
                        County: <p>Madison </p>
                    </h2>
                    <h2>
                        Email:<p> johnsmith68@email.com </p>
                    </h2>
                </div>
                <div className="clientLeft">
                    <ClientModal />
                    <h2>
                        {" "}
            Gender:<p> Male</p>
                    </h2>
                    <h2>
                        {" "}
            Ethnicity: <p>Caucasian </p>
                    </h2>
                    <h2>
                        Additional Notes:{" "}
                        <p>
                            haec sunt additional notas: Ego genus vastationis tempus est
                            Latina interpretatione omnes iusti aspiciens sursum.
            </p>
                    </h2>
                    <h2>
                        {" "}
            ROI: <a> Fill out ROI</a>
                    </h2>
                </div>
            </div>
        );
    }
}

export default ClientHd;
