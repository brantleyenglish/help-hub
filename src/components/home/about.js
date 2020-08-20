import React from "react";
import UnitedWayLogo from "../../images/unitedway_logo.png"

class About extends React.Component {
    render() {
        return (
            <div className="about">
                <img src={UnitedWayLogo} alt="United Way Logo" />
                <div>
                    <h1>ABOUT US</h1>
                    <p>As the central hub within the nonprofit sector in West Tennessee, we unite people in ways that improve each person’s access to health, education, and financial stability. </p>
                    <p>With a 75-year history of service to West Tennessee, we are leading our communities toward sustainable change.  We connect people in need to the resources that can help them, and we unite people who want to help with the opportunity to do so.</p>
                    <p>We focus on empowering our communities by partnering with local agencies who are actively meeting the needs of our communities.  United Way brings together the best people in each community to determine the most critical needs that require collective - not individual - action.</p>
                </div>
            </div>
        );
    }
}

export default About;
