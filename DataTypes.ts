export type CategoryType = {
  icon: string;
  label: string;
  name: string;
};

export type CategoryListType = CategoryType[];

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
  categories?: string[];
  profileUrl?: string;
  admin?: boolean;
};

export type AgencyListType = AgencyType[];

export type AgencyContextType = {
  agencies: AgencyListType;
  agency: AgencyType;
  updateAgencyInfo: ({ newData, agencyId }: { newData: AgencyType, agencyId: string }) => Promise<void>
  agencyMessages: MessageListType;
  agencyProfile: AgencyType;
  setAgencyProfileId: ({ agencyId }: { agencyId: string }) => Promise<void>;
  getAgencyMessagesCallback: () => Promise<void>;
};

export type ClientNotes = {
  id?: string;
  agencyId: string;
  date: string;
  isPrivate?: boolean;
  message: string;
  subject: string;
}

export type ClientFiles = {
  id?: string;
  downloadUrl?: string;
  fileTitle: string;
  description?: string;
  isPrivate?: boolean;
  clientId?: string;
  agencyId?: string;
  date?: string;
}

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
  notes?: ClientNotes[];
  files?: ClientFiles[];
  county?: string;
}

export type ClientListType = ClientType[];

export type ClientContextType = {
  clients: ClientListType;
  client: ClientType;
  updateClientInfo: ({ clientId, newData }: { clientId: string, newData: object }) => Promise<void>;
  createClient: ({ data }: { data: ClientType }) => Promise<void>;
  getAllClientData: () => Promise<void>;
  clientProfile: ClientType | undefined;
  getClientProfile: ({ clientId }: { clientId: string }) => Promise<void>;
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
  subject: string;
  message: string;
  agencyId: string;
  date: string;
  isPrivate: boolean;
  id?: string;
}

export type MessageListType = MessageType[];

export type AssistanceType = SingleAssistanceType[];

export type SingleAssistanceType = {
  agencyId: string;
  clientId: string;
  serviceId: string;
  date: string;
  isPrivate: boolean;
  notes: string;
  id?: string;
}

export type AssistanceDataType = {
  agency: AgencyType;
  client: ClientType;
  service: ServiceType;
  date: string;
  isPrivate: boolean;
  notes: string;
  id?: string;
}

export type AssistanceDataArrayType = AssistanceDataType[];

export type AssistanceContextType = {
  agencyAssistanceData: AssistanceDataArrayType;
  assistanceData: AssistanceDataArrayType;
  setAssistanceClientId: (id: string) => Promise<void>;
  setAssistanceAgencyId: (id: string) => Promise<void>;
  updateAssistanceByClient: () => Promise<void>;
  updateAssistanceByAgency: () => Promise<void>;
};