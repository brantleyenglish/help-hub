export type AgencyType = {
  id: string;
  name: string;
  description: string;
  website: string;
  contactFirstName: string;
  contactLastName: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  counties?: string[];
};

export type AgencyListType = AgencyType[];

export type AgencyContextType = {
  agencies: AgencyListType;
  agency: AgencyType;
  updateAgencyInfo: ({ newData, agencyId }: { newData: AgencyType, agencyId: string }) => Promise<void>
  agencyMessages: MessageListType;
};

export type ClientType = {
  id?: string;
  clientFirstName?: string;
  clientLastName?: string;
  dob: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  gender: string;
  ethnicity: string;
  county: string;
  additionalNotes: string;
}

export type ClientListType = ClientType[];

export type ClientContextType = {
  clients: ClientListType;
  client: ClientType;
  updateClientInfo: ({ clientId, newData }: { clientId: string, newData: object }) => Promise<void>
};

export type ServiceType = {
  agencyId: string;
  categories: string[];
  id: string;
  city: string;
  contactFirstName: string;
  contactLastName: string;
  description: string;
  email: string;
  name: string;
  phone: string;
  state: string;
  streetAddress: string;
  zip: string;
}

export type ServiceListType = ServiceType[];

export type MessageType = {
  message: string;
}

export type MessageListType = MessageType[];