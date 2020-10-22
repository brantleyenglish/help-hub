import React from "react";

import {
  getAgency,
  getAllAgencies,
  createAgency,
  updateAgency,
} from "../firebase/agencies";

import { useAuth } from "./AuthContext";

type AgencyType = {
  city: string;
  contactFirstName: string;
  contactLastName: string;
  description: string;
  id: string;
  name: string;
  phone: string;
  streetAddress: string;
  website: string;
  zip: string;
}

type AgencyListType = AgencyType[];

export type AgencyContextType = {
  agencies: AgencyListType;
  agency: AgencyType;
  updateAgencyInfo: () => Promise<void>
};

type UpdateAgencyInfo = {
  agencyId: string;
  newData: any;
};

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
    if (agencyData === "DoesNotExisit") {
      const newAgencyData = await createAgency({ agencyId: user?.uid });
      setAgency(newAgencyData);
    } else {
      setAgency(agencyData);
    }
  };

  const getAllAgencyData = async () => {
    const agenciesData = await getAllAgencies();
    setAgencies(agenciesData);
  };

  const updateAgencyInfo = async ({ agencyId, newData }: UpdateAgencyInfo) => {
    if (user && user?.uid && agencyId && user?.uid === agencyId) {
      const agencyData = await getAgency({ agencyId: user?.uid });
      if (agencyData !== "DoesNotExisit") {
        await updateAgency({
          agency: agencyData,
          data: newData,
        });
      }
    }
  };

  React.useEffect(() => {
    if (user?.uid) {
      getAgencyData();
    }
  }, [user]);

  React.useEffect(() => {
    getAllAgencyData();
  }, []);

  const value = { agency, agencies, updateAgencyInfo };

  return <AgencyContext.Provider value={value} {...props} />;
};

export const useAgency = () => {
  const context = React.useContext<Partial<AgencyContextType>>(AgencyContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
