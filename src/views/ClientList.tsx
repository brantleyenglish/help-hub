import React, { useEffect, useState } from 'react';
import ClientSearch from "../components/clientList/clientSearch";
import ClientCard from "../components/clientList/clientCard";
import { Link } from "react-router-dom";



class ClientList extends React.Component {
  render() {
    return (
      <div className="ClientPage">
        <ClientSearch />
        <Link to={`/clients/${client?.id}`} key={client?.id}>
          <ClientCard />
        </Link>
      </div>
    );
  }
}

export default ClientList;
