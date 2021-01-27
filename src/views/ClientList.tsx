import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ClientListType, ClientType } from "../../DataTypes";
import ClientRow from "../components/clientRow";
import DateInput from "../components/DateInput";
import ModalWrapper from "../components/ModalWrapper";
import { theme } from "../components/Theme";
import { useAuth } from "../context/AuthContext";
import { useClient } from "../context/ClientContext";
import { useModal } from "../context/ModalContext";
import UWHeader from "../images/uw_header.png";
import CreateClientModal from "../modals/CreateClientModal";

const ClientPageWrapper = styled.div``;

const SearchWrapperWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
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
  h2 {
    color: ${theme.colors.white};
    font-size: 20px;
    width: 50%;
    margin: auto;
    font-weight: normal;
  }
`;
const ClientListWrapper = styled.div`
  margin: 30px;
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
  border: 2px solid ${theme.colors.grayLight};
  border-top: none;
  border-bottom: none;
  td {
    color: ${theme.colors.gray};
  }
  &:last-child {
    border: 2px solid ${theme.colors.grayLight};
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
const EditButton = styled.button`
  margin: auto;
  padding: 8px 10px;
  background: ${theme?.colors?.blue};
  font-size: 18px;
  outline: none;
  border: none;
  border-radius: 10px;
  color: ${theme?.colors?.white};
  cursor: pointer;
  &:hover {
    background: ${theme?.colors?.lightBlue};
  }
`;
const NewClientWrapper = styled.div`
  max-width: 800px;
  padding: 30px;
  margin: auto;
  display: flex;
  flex-direction: column;
  h2 {
    text-align: center;
    margin-top: 0;
  }
`;

const ClientList: React.FC<{}> = ({}) => {
  const { user } = useAuth();
  const history = useHistory();

  React.useEffect(() => {
    if (!user) {
      history.push(`/`);
    }
  }, []);

  const { clients } = useClient();
  const { setActiveModal } = useModal();

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

  const sortClients = (a: ClientType, b: ClientType) => {
    if (a?.clientLastName && b?.clientLastName) {
      if (a?.clientLastName < b?.clientLastName) {
        return -1;
      }
      if (a?.clientLastName > b?.clientLastName) {
        return 1;
      }
    }
    if (a?.clientFirstName && b?.clientFirstName) {
      if (a?.clientFirstName < b?.clientFirstName) {
        return -1;
      }
      if (a?.clientFirstName > b?.clientFirstName) {
        return 1;
      }
    }
    return 0;
  };

  const filteredClients = React.useMemo<ClientListType>(() => {
    if (clients) {
      return clients
        ?.filter(filterBirthDate)
        ?.filter(filterFirstName)
        ?.filter(filterLastName)
        ?.sort(sortClients);
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
      <ModalWrapper modalId="ClientCreate">
        <CreateClientModal
          resetFilters={() => {
            setBirthDate("");
            setFirstName("");
            setLastName("");
          }}
        />
      </ModalWrapper>
      <ClientSearchWrapper>
        <h1>Search Clients</h1>
        <h2>
          To create a client, confirm they are not already in the database by
          filling all three fields below. If there are no results, the "Create
          Client" button will appear.{" "}
        </h2>
        <SearchWrapperWrapper>
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
        </SearchWrapperWrapper>
      </ClientSearchWrapper>

      <ClientListWrapper style={{ overflowX: "auto" }}>
        {/* Table */}
        <ClientTable>
          {/* tr */}
          {filteredClients && (
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
              <th scope="col" style={{ minWidth: "150px" }}>
                <div>Date of Birth</div>
              </th>
              <th scope="col">
                <div>Email</div>
              </th>
              <th scope="col" style={{ minWidth: "120px" }}>
                <div>Phone</div>
              </th>
              <th scope="col" style={{ minWidth: "150px" }}>
                <div>Address</div>
              </th>
            </ClientTableHeader>
          )}
          <ClientTableBody>
            {filteredClients &&
              filteredClients.map((client) => (
                <ClientRow client={client} key={client?.id} />
              ))}
          </ClientTableBody>
        </ClientTable>
        {clients && filteredClients && filteredClients?.length === 0 && (
          <NewClientWrapper>
            <h2>Can't find who you are looking for?</h2>
            <EditButton onClick={() => setActiveModal("ClientCreate")}>
              Create a Client
            </EditButton>
          </NewClientWrapper>
        )}
      </ClientListWrapper>
    </ClientPageWrapper>
  );
};

export default ClientList;
