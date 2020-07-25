import React from "react";

import { AuthProvider } from "./AuthContext";
// import { DrugTestProvider } from "./DrugTestContext";

const ContextProviders: React.FC<any> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ContextProviders;
