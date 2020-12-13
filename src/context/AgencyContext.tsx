import React from "react";
import { useHistory } from "react-router-dom";
import {
  AgencyContextType,
  AgencyListType,
  AgencyType,
  MessageListType,
  ServiceType,
} from "../../DataTypes";
import {
  createAgency,
  getAgency,
  getAllAgencies,
  updateAgency,
} from "../firebase/agencies";
import { getAgencyMessages } from "../firebase/messages";
import { getServicesByAgencyId } from "../firebase/services";
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
  const history = useHistory();
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
      const newAgenciesArray: AgencyListType = [];
      for await (const agencyData of agenciesData) {
        const serviceData = await getServicesByAgencyId({
          agencyId: agencyData?.id,
        });
        if (serviceData === "Error") {
          newAgenciesArray?.push({ ...agencyData, categories: [] });
        } else {
          const agencyCategories = serviceData
            ?.reduce((accu: string[], service: ServiceType) => {
              return [...accu, ...service?.categories];
            }, [])
            ?.filter(
              (value: string, index: number, self: string[]) =>
                self.indexOf(value) === index
            );
          newAgenciesArray?.push({
            ...agencyData,
            categories: agencyCategories,
          });
        }
      }
      setAgencies(newAgenciesArray);
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
      if (agencyMessageData !== "Error") {
        setAgencyMessages(agencyMessageData);
        history.push(`/agencies/${agency?.id}`);
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
