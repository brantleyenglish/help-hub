import React from "react";

import { AuthProvider } from "./AuthContext";
import { AgencyProvider } from "./AgencyContext";

const ContextProviders: React.FC<any> = ({ children }) => {
  return (
    <AuthProvider>
      <AgencyProvider>{children}</AgencyProvider>
    </AuthProvider>
  );
};

export default ContextProviders;
