import React from "react";
import { Link } from "react-router-dom";
import ClientCard from "../components/clientList/clientCard";
import ClientSearch from "../components/clientList/clientSearch";
import { useClient } from "../context/ClientContext";

const ClientList = () => {
  const { clients } = useClient();

  console.log({ clients });
  return (
    <div className="ClientPage">
      <ClientSearch />
      {clients &&
        clients.map((client) => (
          <Link to={`/clients/${client?.id}`} key={client?.id}>
            <ClientCard client={client} />
          </Link>
        ))}
    </div>
  );
};

export default ClientList;
