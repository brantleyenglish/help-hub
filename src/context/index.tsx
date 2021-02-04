import React from "react";
import { AgencyProvider } from "./AgencyContext";
import { AssistanceProvider } from "./AssistanceContext";
import { AuthProvider } from "./AuthContext";
import { ClientProvider } from "./ClientContext";
import { ModalProvider } from "./ModalContext";
import { PublicProvider } from "./PublicContext";

const ContextProviders: React.FC<any> = ({ children }) => {
  return (
    <PublicProvider>
      <ModalProvider>
        <AuthProvider>
          <AssistanceProvider>
            <ClientProvider>
              <AgencyProvider>{children}</AgencyProvider>
            </ClientProvider>
          </AssistanceProvider>
        </AuthProvider>
      </ModalProvider>
    </PublicProvider>
  );
};

export default ContextProviders;
