import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ClientListType } from "../../DataTypes";
import ClientCard from "../components/clientList/clientCard";
import { useClient } from "../context/ClientContext";
import header from "../images/header.png";

const ClientListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`;

const ClientList = () => {
  const { clients } = useClient();

  const [search, setSearch] = React.useState<string>("");

  console.log({ search });

  const filteredClients = React.useMemo<ClientListType>(() => {
    if (clients) {
      if (search?.length === 0) {
        return clients;
      }
      return clients?.filter((client: any) =>
        `${client?.clientFirstName}${client?.clientLastname}`?.includes(search)
      );
    }
    return [];
  }, [search, clients]);

  const handleSearchUpdate = (e: React.BaseSyntheticEvent) => {
    setSearch(e.target.value);
  };

  return (
    <div className="ClientPage">
      <div
        className="client-search"
        style={{
          backgroundImage: `url(${header})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1> Clients</h1>
        <span className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input value={search} onChange={handleSearchUpdate} />
        </span>

        <a>Advanced Search</a>
      </div>
      <ClientListWrapper>
        {filteredClients &&
          filteredClients.map((client) => (
            <Link to={`/clients/${client?.id}`} key={client?.id}>
              <ClientCard client={client} />
            </Link>
          ))}
      </ClientListWrapper>
    </div>
  );
};

export default ClientList;
