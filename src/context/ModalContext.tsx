import React from "react";

type ModalContextType = {
  activeModal: string;
  setActiveModal: React.Dispatch<React.SetStateAction<ActiveModalsType>>;
};

export type ActiveModalsType =
  | ""
  | "AgencyEdit"
  | "AgencyDelete"
  | "ClientEdit"
  | "ClientCreate"
  | "ClientDelete"
  | "MessageCreate"
  | "MessageEdit"
  | "MessageDelete"
  | "ServiceCreate"
  | "ServiceEdit"
  | "ServiceDelete"
  | "AssistanceCreate"
  | "AssistanceEdit"
  | "AssistanceDelete"
  | "FileCreate"
  | "FileEdit"
  | "FileDelete"
  | "NoteCreate"
  | "NoteEdit"
  | "NoteDelete";

export const ModalContext = React.createContext<ModalContextType>({
  setActiveModal: () => { },
  activeModal: "",
});
ModalContext.displayName = "ModalContext";

export const ModalProvider: React.FC<any> = (props) => {
  const [activeModal, setActiveModal] = React.useState<ActiveModalsType>("");

  const value = { activeModal, setActiveModal };

  return <ModalContext.Provider value={value} {...props} />;
};

export const useModal = () => {
  const context = React.useContext<ModalContextType>(ModalContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
