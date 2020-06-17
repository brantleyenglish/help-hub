import React from "react";
import "./footer.css";

class Foot extends React.Component {
    render() {
        return (
            <div className="footy">
                <a href="/">HelpHub</a>
                <p>᛫</p>
                <a href="/pages/servicespg">Services</a>
                <p>᛫</p>
                <a href="/pages/mainAgencies">Agencies</a>
                <p>᛫</p>
                <a href="/pages/clientHome">Clients</a>
                <p>᛫</p>
                <a href="/pages/agencies">Agency Profile</a>
                <p>᛫</p>
                <a href="/">Log Out</a>
            </div>
        );
    }
}

export default Foot;
