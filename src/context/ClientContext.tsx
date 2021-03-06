import React from "react";
import { ClientContextType, ClientListType, ClientType } from "../../DataTypes";
import {
  createClientData,
  getAllClients,
  getClient,
  updateClient,
} from "../firebase/clients";
import { useAssistance } from "./AssistanceContext";
import { useAuth } from "./AuthContext";

type UpdateClientInfoType = {
  clientId: string;
  newData: ClientType;
};

type CreateClientType = {
  data: ClientType;
};

export const ClientContext = React.createContext<Partial<ClientContextType>>(
  {}
);
ClientContext.displayName = "ClientContext";

// TO DO: Adapt this for Authorization to see Clients
export const ClientProvider: React.FC<any> = (props) => {
  const { user } = useAuth();
  const { setAssistanceClientId } = useAssistance();
  const [clients, setClients] = React.useState<ClientListType | null>(null);

  const getAllClientData = React.useCallback(async () => {
    if (user?.uid) {
      const clientsData = await getAllClients();
      if (clientsData) {
        setClients(clientsData);
      }
    }
  }, [user]);

  const updateClientInfo = async ({
    clientId,
    newData,
  }: UpdateClientInfoType) => {
    if (user && user?.uid && clientId) {
      const clientData = await getClient({ clientId });
      if (clientData !== "DoesNotExist" && clientData) {
        await updateClient({
          client: clientData,
          data: newData,
        });
      }
    }
  };

  const createClient = async ({ data }: CreateClientType) => {
    createClientData({ data });
  };

  const [clientProfile, setClientProfile] = React.useState<
    ClientType | undefined
  >(undefined);

  const getClientProfile = async ({ clientId }: { clientId: string }) => {
    if (setAssistanceClientId) {
      setAssistanceClientId(clientId);
    }
    const clientData = await getClient({ clientId });
    if (clientData && clientData !== "DoesNotExist") {
      setClientProfile(clientData);
    }
  };

  React.useEffect(() => {
    getAllClientData();
  }, [getAllClientData]);

  const value = {
    clients,
    updateClientInfo,
    createClient,
    getAllClientData,
    clientProfile,
    getClientProfile,
  };

  return <ClientContext.Provider value={value} {...props} />;
};

export const useClient = () => {
  const context = React.useContext<Partial<ClientContextType>>(ClientContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
