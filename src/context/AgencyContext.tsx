import React from "react";
import {
AgencyContextType,
AgencyListType,
AgencyType,
MessageListType,
ServiceType
} from "../../DataTypes";
import {
createAgency,
getAgency,
getAllAgencies,
updateAgency
} from "../firebase/agencies";
import { getAgencyMessages } from "../firebase/messages";
import { getServicesByAgencyId } from "../firebase/services";
import { useAssistance } from "./AssistanceContext";
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
  const { setAssistanceAgencyId } = useAssistance();
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
          if (setAssistanceAgencyId) {
            setAssistanceAgencyId(user?.uid);
          }
        }
      } else if (agencyData !== "Error") {
        setAgency(agencyData);
        if (setAssistanceAgencyId) {
          setAssistanceAgencyId(user?.uid);
        }
      }
    }
  }, [user]);

  React.useEffect(() => {
    getAgencyData();
  }, [getAgencyData]);

  const getAllAgencyData = React.useCallback(async () => {
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
  }, []);

  const updateAgencyInfo = async ({ agencyId, newData }: UpdateAgencyInfo) => {
    if (
      user &&
      user?.uid &&
      agencyId &&
      (user?.uid === agencyId || agency?.admin)
    ) {
      const agencyData = await getAgency({ agencyId });
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
      }
    }
  }, [agency]);

  React.useEffect(() => {
    getAgencyMessagesCallback();
  }, [getAgencyMessagesCallback]);

  const [agencyProfile, setAgencyProfile] = React.useState<
    AgencyType | undefined
  >(undefined);

  const setAgencyProfileId = React.useCallback(
    async ({ agencyId }: { agencyId: string }) => {
      const agencyData = await getAgency({ agencyId });
      if (
        agencyData &&
        agencyData !== "DoesNotExist" &&
        agencyData !== "Error"
      ) {
        setAgencyProfile(agencyData);
      }
    },
    []
  );

  const value = {
    agency,
    agencies,
    updateAgencyInfo,
    agencyMessages,
    agencyProfile,
    setAgencyProfileId,
    getAgencyMessagesCallback,
  };

  return <AgencyContext.Provider value={value} {...props} />;
};

export const useAgency = () => {
  const context = React.useContext<Partial<AgencyContextType>>(AgencyContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
