import React from "react";
import {
  AgencyListType,
  CategoryListType,
  MessageListType,
  ServiceListType,
} from "../../DataTypes";
import { getAllAgencies } from "../firebase/agencies";
import { getPublicMessages } from "../firebase/messages";
import { getSettings } from "../firebase/misc";
import { getAllServices } from "../firebase/services";

export type PublicContextType = {
  categories: CategoryListType;
  counties: string[];
  allAgencies: AgencyListType;
  allServices: ServiceListType;
  signupPassword: RegExp;
  allPublicMessages: MessageListType;
  refreshServices: () => Promise<void>;
  refreshMessages: () => Promise<void>;
  refreshAgencies: () => Promise<void>;
};

export const PublicContext = React.createContext<Partial<PublicContextType>>(
  {}
);
PublicContext.displayName = "PublicContext";

export const PublicProvider: React.FC<any> = (props) => {
  const [publicData, setPublicData] = React.useState<any>(null);

  const getPublicData = async () => {
    setPublicData({
      allAgencies: await getAllAgencies(),
      allServices: await getAllServices(),
      allPublicMessages: await getPublicMessages(),
      categories: await getSettings("categories"),
      counties: await getSettings("counties"),
      signupPassword: await getSettings("signupPassword"),
    });
  };

  React.useEffect(() => {
    getPublicData();
  }, []);

  const refreshServices = async () => {
    setTimeout(
      async () => setPublicData({
        ...publicData,
        allServices: await getAllServices(),
      }), 
      1000
    );
  };

  const refreshMessages = async () => {
    setTimeout(
      async () => setPublicData({
        ...publicData,
        allPublicMessages: await getPublicMessages(),
      }), 
      1000
    );
  };

  const refreshAgencies = async () => {
    setTimeout(
      async () => setPublicData({
        ...publicData,
        allAgencies: await getAllAgencies(),
      }), 
      1000
    );
  };

  const value = publicData
    ? { ...publicData, refreshServices, refreshMessages, refreshAgencies }
    : {};

  return <PublicContext.Provider value={value} {...props} />;
};

export const usePublicData = () => {
  const context = React.useContext<Partial<PublicContextType>>(PublicContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
