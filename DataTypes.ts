  export type AgencyType = {
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
  };
  
  export type AgencyListType = AgencyType[];
  
  export type AgencyContextType = {
    agencies: AgencyListType;
    agency: AgencyType;
    updateAgencyInfo: () => Promise<void>
  };