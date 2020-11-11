import React from "react";
import { ClientContextType } from "../../DataTypes";

export const ClientContext = React.createContext<Partial<ClientContextType>>(
  {}
);
ClientContext.displayName = "ClientContext";

// TO DO: Adapt this for Authorization to see Clients
// export const ClientProvider: React.FC<any> = (props) => {
//     const { user } = useAuth();
//     const [agency, setAgency] = React.useState<AgencyType>(null);

//     const [agencies, setAgencies] = React.useState<AgencyListType>(null);

//     const getAgencyData = async () => {
//         const agencyData = await getAgency({ agencyId: user?.uid });
//         if (agencyData === "DoesNotExisit") {
//             const newAgencyData = await createAgency({ agencyId: user?.uid });
//             setAgency(newAgencyData);
//         } else {
//             setAgency(agencyData);
//         }
//     };

const getAllClientData = async () => {
  const clientsData = await getAllClients();
  setClients(clientsData);
};

// TO DO: Update this for editing privledges
//     const updateClientInfo = async ({ clientId, newData }: UpdateClientInfo) => {
//         if (user && user?.uid && clientId && user?.uid === clientId) {
//             const clientData = await getClient({ clientId: user?.uid });
//             if (clientData !== "DoesNotExisit") {
//                 await updateClient({
//                     client: clientData,
//                     data: newData,
//                 });
//             }
//         }
//     };

React.useEffect(() => {
  if (user?.uid) {
    getClientData();
  }
}, [user]);

React.useEffect(() => {
  getAllClientData();
}, []);

const value = { client, clients, updateClientInfo };

return <ClientContext.Provider value={value} {...props} />;
};

export const useClient = () => {
  const context = React.useContext<Partial<ClientContextType>>(ClientContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
