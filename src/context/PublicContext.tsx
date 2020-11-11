import React from "react";
import { getAllAgencies } from "../firebase/agencies";
import { getPublicMessages } from "../firebase/messages";
import { getSettings } from "../firebase/misc";
import { getAllServices } from "../firebase/services";

export type PublicContextType = {
  categories: any;
  allServices: any;
  signupPassword: any;
  allPublicMessages: any;
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

  const value = publicData ? { ...publicData } : {};

  return <PublicContext.Provider value={value} {...props} />;
};

export const usePublicData = () => {
  const context = React.useContext<Partial<PublicContextType>>(PublicContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
