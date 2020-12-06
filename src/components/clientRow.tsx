import React, { Component } from 'react';
import styled from "styled-components";
import { theme } from "../components/Theme";
import { Link } from "react-router-dom";

import { useClient } from "../context/ClientContext";
import { ClientListType, ClientType } from "../../DataTypes";
import { useAssistance } from "../context/AssistanceContext";


const StyledRow = styled.tr`
justify-content: space-around;
font-size: 1rem;
td{
    padding: 1rem;
}
`;

const ClientRow: React.FC<any> = ({ client }) => {
    const { setAssistanceClientId } = useAssistance();

    return (
        <StyledRow>
            <td>
                <Link
                    to={`/clients/${client?.id}`}
                    key={client?.id}
                    onClick={() => setAssistanceClientId && client?.id
                        ? setAssistanceClientId(client?.id)
                        : null}
                >
                    {client?.clientFirstName}
                </Link>
            </td>
            <td>
                <Link
                    to={`/clients/${client?.id}`}
                    key={client?.id}
                    onClick={() => setAssistanceClientId && client?.id
                        ? setAssistanceClientId(client?.id)
                        : null}
                >
                    {client?.clientLastName}
                </Link>
            </td>
            <td>
                <Link
                    to={`/clients/${client?.id}`}
                    key={client?.id}
                    onClick={() => setAssistanceClientId && client?.id
                        ? setAssistanceClientId(client?.id)
                        : null}
                >
                    {client?.dob}
                </Link>
            </td>
            <td>
                <Link
                    to={`/clients/${client?.id}`}
                    key={client?.id}
                    onClick={() => setAssistanceClientId && client?.id
                        ? setAssistanceClientId(client?.id)
                        : null}
                >
                    {client?.email}
                </Link>
            </td>
            <td>
                <Link
                    to={`/clients/${client?.id}`}
                    key={client?.id}
                    onClick={() => setAssistanceClientId && client?.id
                        ? setAssistanceClientId(client?.id)
                        : null}
                >
                    {client?.phone}
                </Link>
            </td>
            <td>
                <Link
                    to={`/clients/${client?.id}`}
                    key={client?.id}
                    onClick={() => setAssistanceClientId && client?.id
                        ? setAssistanceClientId(client?.id)
                        : null}
                >
                    {client?.streetAddress}
                </Link>
            </td>


        </StyledRow >
    );
};
export default ClientRow;