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
    setAgency(agencyData);
  };

  const getAllAgencyData = async () => {
    const agenciesData = await getAllAgencies();
    setAgencies(agenciesData);
  };

  React.useEffect(() => {
    if (user?.uid) {
      getAgencyData();
    }
  }, [user]);

  React.useEffect(() => {
    getAllAgencyData();
  }, []);

  const value = { agency, agencies };

  React.useEffect(() => {
    console.log({ agencies });
  }, [agencies]);

  return <AgencyContext.Provider value={value} {...props} />;
};

export const useAgency = () => {
  const context = React.useContext<Partial<AgencyContextType>>(AgencyContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
