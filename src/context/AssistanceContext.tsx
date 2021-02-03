import React from "react";
import { AssistanceContextType, AssistanceType } from "../../DataTypes";
import {
  getAssistanceByAgency,
  getAssistanceByClient,
} from "../firebase/assistance";
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

  // Agency assitance
  const [
    agencyAssistance,
    setAgencyAssistance,
  ] = React.useState<AssistanceType | null>(null);

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

  const value = {
    assistance,
    agencyAssistance,
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
