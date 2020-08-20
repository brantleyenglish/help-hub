import React from "react";

import { getAgency, getAllAgencies } from "../firebase/agencies";

import { useAuth } from "./AuthContext";

export type AgencyContextType = {};

export const AgencyContext = React.createContext<Partial<AgencyContextType>>(
  {}
);
AgencyContext.displayName = "AgencyContext";

export const AgencyProvider: React.FC<any> = (props) => {
  const { user } = useAuth();
  const [agency, setAgency] = React.useState<any>(null);

  const [agencies, setAgencies] = React.useState<any>(null);

  const getAgencyData = async () => {
    const agencyData = await getAgency({ agencyId: user?.uid });
    const agenciesData = await getAllAgencies();
    setAgency(agencyData);
    setAgencies(agenciesData);
    console.log({ agencyData });
  };

  React.useEffect(() => {
    if (user?.uid) {
      getAgencyData();
    }
  }, [user]);

  const value = { agency, agencies };

  return <AgencyContext.Provider value={value} {...props} />;
};

export const useAgency = () => {
  const context = React.useContext<Partial<AgencyContextType>>(AgencyContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
