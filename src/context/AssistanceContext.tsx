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
  const [assistance, setAssistance] = React.useState<AssistanceType | null>(
    null
  );

  const [clientId, setAssistanceClientId] = React.useState<string>("");

  const [agencyId, setAssistanceAgencyId] = React.useState<string>("");

  const [
    assistanceData,
    setAssistanceData,
  ] = React.useState<AssistanceDataArrayType | null>(null);

  const updateAssistanceByAgency = async () => {
    const assistanceData = await getAssistanceByAgency({ agencyId });
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

  const updateAssistanceByClient = async () => {
    const assistanceData = await getAssistanceByClient({ clientId });
    if (assistanceData !== "Error") {
      console.log({
        test: assistanceData?.filter(
          (singleAssistance) =>
            singleAssistance?.agencyId &&
            singleAssistance?.serviceId &&
            singleAssistance?.clientId &&
            (singleAssistance?.agencyId === user?.uid ||
              !singleAssistance?.isPrivate)
        ),
        user: user?.uid,
      });
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
    if (user) {
      updateAssistanceByAgency();
    }
  }, [agencyId, user]);

  React.useEffect(() => {
    getAssistanceData();
  }, [assistance]);

  const value = {
    assistanceData,
    setAssistanceClientId,
    setAssistanceAgencyId,
    updateAssistanceByClient,
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
