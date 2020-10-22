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

type ClientType = {
  additionalNotes: string;
  address: string;
  county: string;
  dob: string;
  email: string;
  ethnicity: string;
  gender: string;
  name: string;
  phone: string;
}

type ClientListType = ClientType[];

export type ClientContextType = {
  clients: ClientListType;
  client: ClientType;
};
