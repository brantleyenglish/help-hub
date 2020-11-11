import React from "react";
import {
  AgencyContextType,
  AgencyListType,
  AgencyType,
  MessageListType,
} from "../../DataTypes";
import {
  createAgency,
  getAgency,
  getAllAgencies,
  updateAgency,
} from "../firebase/agencies";
import { getAgencyMessages } from "../firebase/messages";
import { useAuth } from "./AuthContext";

type UpdateAgencyInfo = {
  agencyId: string;
  newData: AgencyType;
};

export const AgencyContext = React.createContext<Partial<AgencyContextType>>(
  {}
);
AgencyContext.displayName = "AgencyContext";

export const AgencyProvider: React.FC<any> = (props) => {
  const { user } = useAuth();
  const [agency, setAgency] = React.useState<AgencyType | null>(null);

  const [agencies, setAgencies] = React.useState<AgencyListType | null>(null);

  const [
    agencyMessages,
    setAgencyMessages,
  ] = React.useState<MessageListType | null>(null);

  const getAgencyData = React.useCallback(async () => {
    if (user?.uid) {
      const agencyData = await getAgency({ agencyId: user?.uid });
      if (agencyData === "DoesNotExist") {
        const newAgencyData = await createAgency({ agencyId: user?.uid });
        if (newAgencyData !== "DoesNotExist" && newAgencyData !== "Error") {
          setAgency(newAgencyData);
        }
      } else if (agencyData !== "Error") {
        setAgency(agencyData);
      }
    }
  }, [user]);

  React.useEffect(() => {
    getAgencyData();
  }, [getAgencyData]);

  const getAllAgencyData = async () => {
    const agenciesData = await getAllAgencies();
    if (agenciesData !== "Error") {
      setAgencies(agenciesData);
    }
  };

  const updateAgencyInfo = async ({ agencyId, newData }: UpdateAgencyInfo) => {
    if (user && user?.uid && agencyId && user?.uid === agencyId) {
      const agencyData = await getAgency({ agencyId: user?.uid });
      if (agencyData !== "DoesNotExist" && agencyData !== "Error") {
        await updateAgency({
          agency: agencyData,
          data: newData,
        });
      }
    }
  };

  React.useEffect(() => {
    getAllAgencyData();
  }, []);

  const getAgencyMessagesCallback = React.useCallback(async () => {
    if (agency?.id) {
      const agencyMessageData = await getAgencyMessages({
        agencyId: agency?.id,
      });
      console.log({ agencyMessageData });
      if (agencyMessageData !== "Error") {
        setAgencyMessages(agencyMessageData);
      }
    }
  }, [agency]);

  React.useEffect(() => {
    getAgencyMessagesCallback();
  }, [getAgencyMessagesCallback]);

  const value = { agency, agencies, updateAgencyInfo, agencyMessages };

  return <AgencyContext.Provider value={value} {...props} />;
};

export const useAgency = () => {
  const context = React.useContext<Partial<AgencyContextType>>(AgencyContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
