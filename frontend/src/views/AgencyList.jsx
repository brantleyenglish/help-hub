import React from "react";
import AHeader from "../components/agencyLoggedOut/agencyHeader";
import AgencyMod from "../components/agencyLoggedOut/agencyModal";
import { Link } from "react-router-dom";

class AgencyList extends React.Component {
  state = {
    agencies: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
  };

  render() {
    return (
      <div className="loggedOut">
        <AHeader />
        <div className="bckgrnd">
          {this.state.agencies.map(agencies => (
            <Link to="/pages/agencies">
              <AgencyMod key={agencies.id} />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default AgencyList;
