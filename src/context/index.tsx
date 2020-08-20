import React from "react";

import { PublicProvider } from "./PublicContext";
import { AuthProvider } from "./AuthContext";
import { AgencyProvider } from "./AgencyContext";

const ContextProviders: React.FC<any> = ({ children }) => {
  return (
    <PublicProvider>
      <AuthProvider>
        <AgencyProvider>{children}</AgencyProvider>
      </AuthProvider>
    </PublicProvider>
  );
};

export default ContextProviders;
