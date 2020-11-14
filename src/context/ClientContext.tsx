import React from "react";
import { ClientContextType, ClientListType } from "../../DataTypes";
import { getAllClients } from "../firebase/clients";
import { useAuth } from "./AuthContext";

export const ClientContext = React.createContext<Partial<ClientContextType>>(
  {}
);
ClientContext.displayName = "ClientContext";

// TO DO: Adapt this for Authorization to see Clients
export const ClientProvider: React.FC<any> = (props) => {
  const { user } = useAuth();
  const [clients, setClients] = React.useState<ClientListType | null>(null);

  const getAllClientData = React.useCallback(async () => {
    if (user?.uid) {
      const clientsData = await getAllClients();
      if (clientsData) {
        setClients(clientsData);
      }
    }
  }, [user]);

  const updateClientInfo = React.useCallback(async ({ clientId, newData }) => {
    console.log({ clientId, newData });
  }, []);

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
    getAllClientData();
  }, [getAllClientData]);

  const value = { clients, updateClientInfo };

  return <ClientContext.Provider value={value} {...props} />;
};

export const useClient = () => {
  const context = React.useContext<Partial<ClientContextType>>(ClientContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
