import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../components/Theme";
import { ClientListType } from "../../DataTypes";
import ClientCard from "../components/clientList/clientCard";
import { useClient } from "../context/ClientContext";
import SearchBar from "../components/global/searchbar";
import UWHeader from "../images/uw_header.png";

const ClientSearchWrapper = styled.div`
padding: 40px 0px 40px 0px;
text-align: center;
background-color: ${theme.colors.blue};
background-image: url(${UWHeader});
background-size: cover;
background-position: center center;
background-repeat: no-repeat;
& h1{
    color: ${theme.colors.white};
    font-size: 45px;
    text-transform: uppercase;
};
`;

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
    <>
      <ClientSearchWrapper>
        <h1> Clients </h1>
        <SearchBar></SearchBar>
        <a href="">Advanced Search</a>
      </ClientSearchWrapper>

      <ClientListWrapper>
        {filteredClients &&
          filteredClients.map((client) => (
            <Link to={`/clients/${client?.id}`} key={client?.id}>
              <ClientCard client={client} />
            </Link>
          ))}
      </ClientListWrapper>
    </>
  );
};

export default ClientList;
