import React from "react";

class Header extends React.Component {
    render() {
        if (this.props.show) {
            return null;
        }

        return (
            <div className="header">
                <h1 style={{ textAlign: "center", color: "#B23633" }}> SERVICES </h1>
            </div>
        );
    }
}

export default Header;
