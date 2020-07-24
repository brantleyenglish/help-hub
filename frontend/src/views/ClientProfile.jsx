import React from "react";
import ClientHd from "../components/clientProfile/clientHeader";
import SmallHead from "../components/clientProfile/timelineToggle";

class ClientProfile extends React.Component {
  render() {
    return (
      <div className="ClientPage">
        <ClientHd />
        <SmallHead />
      </div>
    );
  }
}

export default ClientProfile;
