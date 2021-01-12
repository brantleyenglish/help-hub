import React from "react";
import {
  AssistanceContextType,
  AssistanceDataArrayType,
  AssistanceType,
} from "../../DataTypes";
import { getAgency } from "../firebase/agencies";
import {
  getAssistanceByAgency,
  getAssistanceByClient,
} from "../firebase/assistance";
import { getClient } from "../firebase/clients";
import { getService } from "../firebase/services";
import { useAuth } from "./AuthContext";

export const AssistanceContext = React.createContext<Partial<any>>({});
AssistanceContext.displayName = "AssistanceContext";

export const AssistanceProvider: React.FC<any> = (props) => {
  const { user } = useAuth();
  const [clientId, setAssistanceClientId] = React.useState<string>("");
  const [agencyId, setAssistanceAgencyId] = React.useState<string>("");

  // Client assistance
  const [assistance, setAssistance] = React.useState<AssistanceType | null>(
    null
  );

  // Client assitance Data
  const [
    assistanceData,
    setAssistanceData,
  ] = React.useState<AssistanceDataArrayType | null>(null);

  // Agency assitance
  const [
    agencyAssistance,
    setAgencyAssistance,
  ] = React.useState<AssistanceType | null>(null);

  // Agency assistance Data
  const [
    agencyAssistanceData,
    setAgencyAssistanceData,
  ] = React.useState<AssistanceDataArrayType | null>(null);

  const updateAssistanceByAgency = async () => {
    if (agencyId) {
      const agencyassistanceApiData = await getAssistanceByAgency({ agencyId });
      if (agencyassistanceApiData !== "Error") {
        setAgencyAssistance(
          agencyassistanceApiData?.filter(
            (singleAssistance) =>
              singleAssistance?.agencyId &&
              singleAssistance?.serviceId &&
              singleAssistance?.clientId &&
              (singleAssistance?.agencyId === user?.uid ||
                !singleAssistance?.isPrivate)
          )
        );
      }
    }
  };

  const getAgencyAssistanceData = async () => {
    if (agencyAssistance) {
      const assistanceDataObject: AssistanceDataArrayType = [];
      for await (const singleAssistance of agencyAssistance) {
        const agencyData = await getAgency({
          agencyId: singleAssistance?.agencyId,
        });
        const clientData = await getClient({
          clientId: singleAssistance?.clientId,
        });
        const serviceData = await getService({
          serviceId: singleAssistance?.serviceId,
        });
        if (
          agencyData &&
          clientData &&
          serviceData &&
          typeof agencyData !== "string" &&
          typeof clientData !== "string" &&
          typeof serviceData !== "string"
        ) {
          assistanceDataObject?.push({
            id: singleAssistance?.id,
            date: singleAssistance?.date,
            notes: singleAssistance?.notes,
            isPrivate: singleAssistance?.isPrivate,
            agency: agencyData,
            client: clientData,
            service: serviceData,
          });
        }
      }
      setAgencyAssistanceData(assistanceDataObject);
    }
  };

  React.useEffect(() => {
    getAgencyAssistanceData();
  }, [agencyAssistance]);

  const updateAssistanceByClient = async () => {
    const assistanceData = await getAssistanceByClient({ clientId });
    if (assistanceData !== "Error") {
      setAssistance(
        assistanceData?.filter(
          (singleAssistance) =>
            singleAssistance?.agencyId &&
            singleAssistance?.serviceId &&
            singleAssistance?.clientId &&
            (singleAssistance?.agencyId === user?.uid ||
              !singleAssistance?.isPrivate)
        )
      );
    }
  };

  const getAssistanceData = async () => {
    if (assistance) {
      const assistanceDataObject: AssistanceDataArrayType = [];
      for await (const singleAssistance of assistance) {
        const agencyData = await getAgency({
          agencyId: singleAssistance?.agencyId,
        });
        const clientData = await getClient({
          clientId: singleAssistance?.clientId,
        });
        const serviceData = await getService({
          serviceId: singleAssistance?.serviceId,
        });
        if (
          agencyData &&
          clientData &&
          serviceData &&
          typeof agencyData !== "string" &&
          typeof clientData !== "string" &&
          typeof serviceData !== "string"
        ) {
          assistanceDataObject?.push({
            id: singleAssistance?.id,
            date: singleAssistance?.date,
            notes: singleAssistance?.notes,
            isPrivate: singleAssistance?.isPrivate,
            agency: agencyData,
            client: clientData,
            service: serviceData,
          });
        }
      }
      setAssistanceData(assistanceDataObject);
    }
  };

  React.useEffect(() => {
    if (user) {
      updateAssistanceByClient();
    }
  }, [clientId, user]);

  React.useEffect(() => {
    if (user && agencyId) {
      updateAssistanceByAgency();
    }
  }, [agencyId, user]);

  React.useEffect(() => {
    getAssistanceData();
  }, [assistance]);

  const value = {
    assistanceData,
    agencyAssistanceData,
    setAssistanceClientId,
    setAssistanceAgencyId,
    updateAssistanceByClient,
    updateAssistanceByAgency,
  };

  return <AssistanceContext.Provider value={value} {...props} />;
};

export const useAssistance = () => {
  const context = React.useContext<Partial<AssistanceContextType>>(
    AssistanceContext
  );
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
