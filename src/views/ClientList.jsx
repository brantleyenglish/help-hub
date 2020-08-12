import React from "react";
import ClientSearch from "../components/clientList/clientSearch";
import ClientProf from "../components/clientList/clientCard";
import { Link } from "react-router-dom";

class ClientList extends React.Component {
  state = {
    clientprofile: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
  };

  render() {
    return (
      <div className="clientHome">
        <ClientSearch />
        <div className="anotherclientdiv">
          {this.state.clientprofile.map(clientprofile => (
            <Link to="/views/ClientProfile">
              <ClientProf key={clientprofile.id} />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default ClientList;
