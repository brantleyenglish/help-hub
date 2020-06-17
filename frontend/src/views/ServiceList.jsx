import React from "react";
import ServHeader from "/components/servpage/servheader";
import ServProf from "/components/servpage/servprof";
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
          <Link to="/pages/agencies">
            <ServProf key={services.id} />
          </Link>
        ))}
      </div>
    );
  }
}

export default ServiceList;
