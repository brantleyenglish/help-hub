import React from "react";
import { ClientContextType, ClientListType, ClientType } from "../../DataTypes";
import {
    createClient,
    getClient,
    getAllClients,
    updateClient,
} from "../firebase/clients";
import { useAuth } from "./AuthContext";

export const ClientContext = React.createContext<Partial<ClientContextType>>(
    {}
);
ClientContext.displayName = "ClientContext";

// export const AgencyProvider: React.FC<any> = (props) => {
//     const { user } = useAuth();
//     const [agency, setAgency] = React.useState<AgencyType>(null);

//     const [agencies, setAgencies] = React.useState<AgencyListType>(null);

//     const getAgencyData = async () => {
//         const agencyData = await getAgency({ agencyId: user?.uid });
//         if (agencyData === "DoesNotExisit") {
//             const newAgencyData = await createAgency({ agencyId: user?.uid });
//             setAgency(newAgencyData);
//         } else {
//             setAgency(agencyData);
//         }
//     };

//     const getAllAgencyData = async () => {
//         const agenciesData = await getAllAgencies();
//         setAgencies(agenciesData);
//     };

//     const updateAgencyInfo = async ({ agencyId, newData }: UpdateAgencyInfo) => {
//         if (user && user?.uid && agencyId && user?.uid === agencyId) {
//             const agencyData = await getAgency({ agencyId: user?.uid });
//             if (agencyData !== "DoesNotExisit") {
//                 await updateAgency({
//                     agency: agencyData,
//                     data: newData,
//                 });
//             }
//         }
//     };

//     React.useEffect(() => {
//         if (user?.uid) {
//             getAgencyData();
//         }
//     }, [user]);

//     React.useEffect(() => {
//         getAllAgencyData();
//     }, []);

//     const value = { agency, agencies, updateAgencyInfo };

//     return <AgencyContext.Provider value={value} {...props} />;
// };

export const useAgency = () => {
    const context = React.useContext<Partial<AgencyContextType>>(AgencyContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};
