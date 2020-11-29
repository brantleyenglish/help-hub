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
  const [assistance, setAssistance] = React.useState<AssistanceType | null>(
    null
  );

  const [clientId, setAssistanceClientId] = React.useState<string>("");

  const [agencyId, setAssistanceAgencyId] = React.useState<string>("");

  const updateAssistanceByAgency = async () => {
    const assistanceData = await getAssistanceByAgency({ agencyId });
    if (assistanceData !== "Error") {
      setAssistance(
        assistanceData?.filter(
          (singleAssistance) =>
            singleAssistance?.agencyId === user?.uid ||
            !singleAssistance?.isPrivate
        )
      );
    }
  };

  const updateAssistanceByClient = async () => {
    const assistanceData = await getAssistanceByClient({ clientId });
    if (assistanceData !== "Error") {
      setAssistance(
        assistanceData?.filter(
          (singleAssistance) =>
            singleAssistance?.agencyId === user?.uid ||
            !singleAssistance?.isPrivate
        )
      );
    }
  };

  React.useEffect(() => {
    updateAssistanceByClient();
  }, [clientId]);

  React.useEffect(() => {
    updateAssistanceByAgency();
  }, [agencyId]);

  const value = { assistance, setAssistanceClientId, setAssistanceAgencyId };

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
