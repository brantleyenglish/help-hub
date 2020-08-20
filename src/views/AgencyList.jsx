import React from "react";
import AgencySearch from "../components/agencyList/agencySearch";
import AgencyCard from "../components/agencyList/agencyCard";
import { Link } from "react-router-dom";

class AgencyList extends React.Component {
  state = {
    agencies: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
  };

  render() {
    return (
      <div>
        <AgencySearch />
        <div className="bckgrnd">
          {this.state.agencies.map(agencies => (
            <Link to="/views/AgencyProfile">
              <AgencyCard key={agencies.id} />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default AgencyList;
