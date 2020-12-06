import { faArrowDown, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
const AdvancedSearchBar = styled.input`
  padding: 5px;
  font-size: 12px;
  flex: 1;
  margin: 0px 10px;
`;
const SearchOptions = styled.button`
  /* outline: none;
  border: none;
  background-color: #0e4680; */
`;
const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-right: 30px;
  display: flex;
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
  // display: flex;
  // flex-direction: row;
  // flex-wrap: wrap;
  // justify-content: center;
  // align-items: center;
  padding: 30px;
`;
const ClientTable = styled.table`
  border-collapse: collapse;
  flex-direction: column;
  width: 100%;
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
  a {
    color: ${theme.colors.gray};
  }
  &:last-child {
    border: 2px solid ${theme.colors.gray};
    border-top: none;
  }
  &:nth-child(even) {
    background: ${theme.colors.grayLight};
  }
  tr:hover {
    background: ${theme.colors.yellow};
    & a {
      color: ${theme.colors.white};
    }
  }
`;

const ClientList: React.FC<{}> = ({}) => {
  const { clients } = useClient();

  const [search, setSearch] = React.useState<string>("");
  const [birthDate, setBirthDate] = React.useState<string>("");
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");

  console.log({ birthDate, firstName, lastName });

  const [searchState, setSearchState] = React.useState<"simple" | "advanced">(
    "advanced"
  );

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
      if (searchState === "simple") {
        // If no search return all
        if (search?.length === 0) {
          return clients;
        }
        // If search filter clients
        return clients?.filter(
          (client: ClientType) =>
            (client?.clientFirstName &&
              client?.clientFirstName?.toLowerCase()?.includes(search)) ||
            (client?.clientLastName &&
              client?.clientLastName?.toLowerCase()?.includes(search)) ||
            (client?.dob && client?.dob?.toLowerCase()?.includes(search)) ||
            (client?.clientFirstName &&
              client?.clientLastName &&
              `${client?.clientFirstName} ${client?.clientLastName} `
                ?.toLowerCase()
                ?.includes(search))
        );
      } else if (searchState === "advanced") {
        return clients
          ?.filter(filterBirthDate)
          ?.filter(filterFirstName)
          ?.filter(filterLastName);
      }
    }
    return [];
  }, [search, clients, searchState, birthDate, firstName, lastName]);

  const handleSearchUpdate = (e: React.BaseSyntheticEvent) => {
    setSearch(e.target.value?.toLowerCase());
  };

  const handleFirstNameUpdate = (e: React.BaseSyntheticEvent) => {
    setFirstName(e.target.value?.toLowerCase());
  };
  const handleLastNamehUpdate = (e: React.BaseSyntheticEvent) => {
    setLastName(e.target.value?.toLowerCase());
  };

  const toggleSearchState = () => {
    if (searchState === "simple") {
      setSearchState("advanced");
    } else if (searchState === "advanced") {
      setSearchState("simple");
    }
  };

  return (
    <ClientPageWrapper>
      <ClientSearchWrapper>
        <h1>Clients</h1>
        <ClientTableWrapper>
          <SearchWrapper>
            {searchState === "simple" && (
              <SearchInputWrapper>
                <SearchBar onChange={handleSearchUpdate} type="search" />
                {/* <FontAwesomeIcon icon={faSearch} style={{ color: "#0e4680" }} /> */}
              </SearchInputWrapper>
            )}
            {searchState === "advanced" && (
              <SearchInputWrapper>
                <AdvancedSearchBar
                  onChange={handleFirstNameUpdate}
                  type="search"
                  placeholder="First Name"
                />
                <AdvancedSearchBar
                  onChange={handleLastNamehUpdate}
                  type="search"
                  placeholder="Last Name"
                />
                <DateInput setValue={setBirthDate} />
              </SearchInputWrapper>
            )}
            <SearchOptions onClick={toggleSearchState}>
              <FontAwesomeIcon
                icon={faEllipsisH}
                style={{ color: "#0e4680" }}
              />
            </SearchOptions>
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
                First Name <FontAwesomeIcon icon={faArrowDown} />
              </div>
            </th>
            <th scope="col">
              <div>
                Last Name <FontAwesomeIcon icon={faArrowDown} />
              </div>
            </th>
            <th scope="col">
              <div>
                Date of Birth <FontAwesomeIcon icon={faArrowDown} />
              </div>
            </th>
            <th scope="col">
              <div>
                Email <FontAwesomeIcon icon={faArrowDown} />
              </div>
            </th>
            <th scope="col">
              <div>
                Phone <FontAwesomeIcon icon={faArrowDown} />
              </div>
            </th>
            <th scope="col">
              <div>
                Address
                <FontAwesomeIcon icon={faArrowDown} />
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
