
import { db } from "./config";
import { AssistanceType, SingleAssistanceType } from '../../DataTypes';

type GetAssistanceByAgencyType = { agencyId: string };
type GetAssistanceByClientType = { clientId: string };

export const getAssistanceByAgency = async ({ agencyId }: GetAssistanceByAgencyType) => {
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



export const getAssistanceByClient = async ({ clientId }: GetAssistanceByClientType) => {
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

type CreateAssistanceType = {
  data: SingleAssistanceType;
}

export const createAssistance = async ({ data }: CreateAssistanceType) => {
  try {
    const docRef = db.collection("assistance").doc();
    await docRef.set({
      id: docRef?.id,
      ...data
    })
    const assistance = await docRef.get();
    if (assistance.exists) {
      return assistance.data();
    } else {
      return "DoesNotExisit";
    }
  } catch (e) {
    console.log("Error createClient:", e);
  }
};

type UpdateAssistanceType = {
  data: SingleAssistanceType;
};

export const updateAssistance = async ({ data }: UpdateAssistanceType) => {
  console.log({ data })
  try {
    const docRef = db.collection("assistance").doc(data?.id);
    await docRef.set(data);
    const agencyData = await docRef.get();
    if (agencyData.exists) {
      return agencyData.data() as AssistanceType;
    } else {
      return "DoesNotExist";
    }
  } catch (e) {
    console.log("Error updateAgency:", e);
    return "Error";
  }
};

export const deleteAssistance = async ({ assistanceId }: { assistanceId: string }) => {
  try {
    const assistanceDoc = db.collection("assistance").doc(assistanceId);
    assistanceDoc.delete();
  } catch (e) {
    console.log("Error deleteAssistance:", e);
    return 'Error';
  }
}


