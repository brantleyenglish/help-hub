import React from "react";
import ServHeader from "../components/serviceList/serviceSearch";
import ServProf from "../components/serviceList/serviceCard";
import { Link } from "react-router-dom";

class ServiceList extends React.Component {
  state = {
    services: [{ id: 1 }, { id: 2 }, { id: 3 }]
  };

  render() {
    return (
      <div>
        <ServHeader />
        {this.state.services.map(services => (
          <Link to="/views/AgencyProfile">
            <ServProf key={services.id} />
          </Link>
        ))}
      </div>
    );
  }
}

export default ServiceList;
