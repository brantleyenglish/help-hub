import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const StyledRow = styled.tr`
  justify-content: space-around;
  font-size: 1rem;
  cursor: pointer;
  td {
    padding: 1rem;
  }
`;

const ClientRow: React.FC<any> = ({ client }) => {
  const history = useHistory();

  return (
    <StyledRow onClick={() => history?.push(`/clients/${client?.id}`)}>
      <td>{client?.clientFirstName}</td>
      <td>{client?.clientLastName}</td>
      <td>{client?.dob}</td>
      <td>{client?.email}</td>
      <td>{client?.phone}</td>
      <td>{client?.streetAddress} {client?.city}, {client?.state} </td>
    </StyledRow>
  );
};
export default ClientRow;
