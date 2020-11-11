import React, { useEffect, useState } from 'react';
import ClientSearch from "../components/clientList/clientSearch";
import ClientProf from "../components/clientList/clientCard";
import { Link } from "react-router-dom";



class ClientList extends React.Component {
  render() {
    return (
      <div className="ClientPage">
        <ClientSearch />
        <ClientProf />
      </div>
    );
  }
}

export default ClientList;
