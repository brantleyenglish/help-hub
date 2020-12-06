import React, { Component } from 'react';
import styled from "styled-components";
import { theme } from "../components/Theme";

import { useClient } from "../context/ClientContext";
import { ClientListType, ClientType } from "../../DataTypes";

const StyledRow = styled.tr`
  td:last-of-type {
    text-decoration: none;
    opacity: 1;
  }
`;

const ClientRow: React.FC<any> = ({ client }) => {
    return (
        <StyledRow>
            <td>{client?.clientFirstName}</td>
            <td>{client?.clientLastName}</td>
            <td>{client?.dob}</td>
            <td>{client?.email}</td>
            <td>{client?.phone}</td>
            <td>{client?.streetAddress}</td>
        </StyledRow>
    );
};
export default ClientRow;