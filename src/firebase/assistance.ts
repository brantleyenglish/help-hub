
import { db } from "./config";
import { AssistanceType } from '../../DataTypes';

type GetAssistanceByAgencyType = { agencyId: string };
type GetAssistanceByClientType = { clientId: string };

export const getAssistanceByAgency = async ({agencyId} : GetAssistanceByAgencyType) => {
    try {
        const docs = await db.collection("assistance").where("agencyId", "==", agencyId).get();
        const assistance: any = [];
        docs.forEach((singleAssistance) => {
            assistance.push(singleAssistance.data());
        });
        return assistance as AssistanceType;
      } catch (e) {
        console.log("Error getAssistanceByAgency:", e);
        return 'Error';
      }
};



export const getAssistanceByClient = async ({clientId}: GetAssistanceByClientType) => {
    try {
        const docs = await db.collection("assistance").where("clientId", "==", clientId).get();
        const assistance: any = [];
        docs.forEach((singleAssistance) => {
            assistance.push(singleAssistance.data());
        });
        return assistance as AssistanceType;
      } catch (e) {
        console.log("Error getAssistanceByClient:", e);
        return 'Error';
      }
  };
