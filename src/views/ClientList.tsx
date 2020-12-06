import React from "react";
import styled from "styled-components";
import { ClientListType, ClientType } from "../../DataTypes";
import ClientRow from "../components/clientRow";
import DateInput from "../components/DateInput";
import NewClientForm from "../components/NewClientForm";
import { theme } from "../components/Theme";
import { useClient } from "../context/ClientContext";
import UWHeader from "../images/uw_header.png";

const ClientPageWrapper = styled.div``;

const ClientTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const SearchWrapper = styled.div`
  padding: 30px;
  max-width: 800px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const SearchBar = styled.input`
  width: 100%;
  padding: 5px;
  font-size: 12px;
`;
const AdvancedSearchBar = styled.input<{
  marginLeft?: string;
  marginRight?: string;
}>`
  padding: 5px;
  font-size: 12px;
  flex: 1;
  margin: 0px 10px;
  ${(p) => p?.marginLeft && `margin-left: ${p?.marginLeft}`};
  ${(p) => p?.marginRight && `margin-right: ${p?.marginRight}`}
`;
const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  > svg {
    position: absolute;
    right: 10px;
  }
`;
const ClientSearchWrapper = styled.div`
  padding: 40px 0px 40px 0px;
  text-align: center;
  background-color: ${theme.colors.blue};
  background-image: url(${UWHeader});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  & h1 {
    color: ${theme.colors.white};
    font-size: 45px;
    text-transform: uppercase;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;
const ClientListWrapper = styled.div`
  padding: 30px;
`;
const ClientTable = styled.table`
  border-collapse: collapse;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: auto;
`;
const ClientTableHeader = styled.tr`
  justify-content: space-around;
  background: ${theme.colors.blue};
  border: 2px solid ${theme.colors.blue};

  th {
    color: ${theme.colors.white};
    text-align: left;
    font-size: 1rem;
    padding: 1rem;
    svg {
      font-size: 1rem;
      margin-left: 0.5rem;
    }
    > div {
      align-items: center;
    }
  }
`;
const ClientTableBody = styled.tbody`
  border: 2px solid ${theme.colors.gray};
  border-top: none;
  border-bottom: none;
  td {
    color: ${theme.colors.gray};
  }
  &:last-child {
    border: 2px solid ${theme.colors.gray};
    border-top: none;
  }
  tr {
    background: ${theme.colors.white};
    &:nth-child(even) {
      background: ${theme.colors.grayLight};
    }
    &:hover {
      td {
        color: ${theme.colors.lightBlue};
      }
    }
  }
`;

const ClientList: React.FC<{}> = ({}) => {
  const { clients } = useClient();

  const [birthDate, setBirthDate] = React.useState<string>("");
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");

  const filterBirthDate = (client: ClientType) => {
    if (client?.dob) {
      if (birthDate?.length > 0) {
        return client?.dob?.includes(birthDate);
      }
      return true;
    }
    return false;
  };

  const filterFirstName = (client: ClientType) => {
    if (client?.clientFirstName) {
      if (firstName?.length > 0) {
        return client?.clientFirstName
          ?.toLowerCase()
          ?.includes(firstName?.toLowerCase());
      }
      return true;
    }
    return false;
  };

  const filterLastName = (client: ClientType) => {
    if (client?.clientLastName) {
      if (lastName?.length > 0) {
        return client?.clientLastName
          ?.toLowerCase()
          ?.includes(lastName?.toLowerCase());
      }
      return true;
    }
    return false;
  };

  const filteredClients = React.useMemo<ClientListType>(() => {
    if (clients) {
      return clients
        ?.filter(filterBirthDate)
        ?.filter(filterFirstName)
        ?.filter(filterLastName);
    }
    return [];
  }, [clients, birthDate, firstName, lastName]);

  const handleFirstNameUpdate = (e: React.BaseSyntheticEvent) => {
    setFirstName(e.target.value?.toLowerCase());
  };
  const handleLastNamehUpdate = (e: React.BaseSyntheticEvent) => {
    setLastName(e.target.value?.toLowerCase());
  };

  return (
    <ClientPageWrapper>
      <ClientSearchWrapper>
        <h1>Clients</h1>
        <ClientTableWrapper>
          <SearchWrapper>
            <SearchInputWrapper>
              <AdvancedSearchBar
                onChange={handleFirstNameUpdate}
                type="search"
                placeholder="First Name"
                marginLeft="0px"
              />
              <AdvancedSearchBar
                onChange={handleLastNamehUpdate}
                type="search"
                placeholder="Last Name"
              />
              <DateInput setValue={setBirthDate} />
            </SearchInputWrapper>
          </SearchWrapper>
        </ClientTableWrapper>
      </ClientSearchWrapper>

      <ClientListWrapper>
        {/* Table */}
        <ClientTable>
          {/* tr */}
          <ClientTableHeader>
            <th scope="col">
              <div>
                First Name
                {/* <FontAwesomeIcon icon={faArrowDown} /> */}
              </div>
            </th>
            <th scope="col">
              <div>
                Last Name
                {/* <FontAwesomeIcon icon={faArrowDown} /> */}
              </div>
            </th>
            <th scope="col">
              <div>
                Date of Birth
                {/* <FontAwesomeIcon icon={faArrowDown} /> */}
              </div>
            </th>
            <th scope="col">
              <div>
                Email
                {/* <FontAwesomeIcon icon={faArrowDown} /> */}
              </div>
            </th>
            <th scope="col">
              <div>
                Phone
                {/* <FontAwesomeIcon icon={faArrowDown} /> */}
              </div>
            </th>
            <th scope="col">
              <div>
                Address
                {/* <FontAwesomeIcon icon={faArrowDown} /> */}
              </div>
            </th>
          </ClientTableHeader>
          <ClientTableBody>
            {filteredClients &&
              filteredClients.map((client) => <ClientRow client={client} />)}
          </ClientTableBody>
        </ClientTable>

        {filteredClients && filteredClients?.length === 0 && (
          <ClientListWrapper>
            <h2>Can't find who you are looking for?</h2>
            <NewClientForm />
          </ClientListWrapper>
        )}
      </ClientListWrapper>
    </ClientPageWrapper>
  );
};

export default ClientList;
