import React from "react";
import ClientHd from "../components/clientProfile/clientHeader";
import SmallHead from "/components/client/clientprofile/smallhead";

class Client extends React.Component {
  render() {
    return (
      <div className="ClientPage">
        <ClientHd />
        <SmallHead />
      </div>
    );
  }
}

export default Client;
