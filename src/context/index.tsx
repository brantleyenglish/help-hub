import React from "react";
import { AgencyProvider } from "./AgencyContext";
import { AuthProvider } from "./AuthContext";
import { ClientProvider } from "./ClientContext";
import { PublicProvider } from "./PublicContext";

const ContextProviders: React.FC<any> = ({ children }) => {
  return (
    <PublicProvider>
      <AuthProvider>
        <ClientProvider>
          <AgencyProvider>{children}</AgencyProvider>
        </ClientProvider>
      </AuthProvider>
    </PublicProvider>
  );
};

export default ContextProviders;
