import { db } from "./config";
import { AgencyType, AgencyListType } from '../../DataTypes';

type AgencyIdType = { agencyId: string };

type UpdateAgencyType = {
  agency: AgencyType;
  data: any;
};

export const getAllAgencies = async () => {
  try {
    const docs = await db.collection("agencies").get();
    const agencies: any = [];
    docs.forEach((agency) => {
      if (agency.data()) {
        agencies.push(agency.data());
      }
    });
    return agencies as AgencyListType;
  } catch (e) {
    console.log("Error getAllAgencies:", e);
    return 'Error'
  }
};

export const getAgency = async ({ agencyId }: AgencyIdType) => {
  try {
    const doc = await db.collection("agencies").doc(agencyId);
    const agency = await doc.get();

    if (agency.exists) {
      return agency.data() as AgencyType;
    } else {
      return "DoesNotExist";
    }
  } catch (e) {
    console.log("Error getAgency:", e);
    return "Error";
  }
};

export const createAgency = async ({ agencyId }: AgencyIdType) => {
  try {
    const docRef = db.collection("agencies").doc(agencyId);
    await docRef.set({
      id: agencyId,
    });
    const agency = await docRef.get();
    if (agency.exists) {
      return agency.data() as AgencyType;
    } else {
      return "DoesNotExist";
    }
  } catch (e) {
    console.log("Error getAgency:", e);
    return "Error";
  }
};



export const updateAgency = async ({ agency, data }: UpdateAgencyType) => {
  try {
    const docRef = db.collection("agencies").doc(agency?.id);
    await docRef.set({
      ...agency,
      ...data,
    });
    const agencyData = await docRef.get();
    if (agencyData.exists) {
      return agencyData.data() as AgencyType;
    } else {
      return "DoesNotExist";
    }
  } catch (e) {
    console.log("Error updateAgency:", e);
    return "Error";
  }
};

// Completly eleminates all agency data. Must be used with caution
export const deleteAgency = async ({ agencyId }: { agencyId: string }) => {
  try {
    const agencyDoc = db.collection("agencies").doc(agencyId);
    agencyDoc.delete();

    const servicesDoc = await db.collection("services").where("agencyId", "==", agencyId).get();
    servicesDoc.forEach((service) => {
      service.ref.delete();
    });

    const messagesDoc = await db.collection("messages").where("agencyId", "==", agencyId).get();
    messagesDoc.forEach((message) => {
      message.ref.delete();
    });

    const assistanceDoc = await db.collection("assistance").where("agencyId", "==", agencyId).get();
    assistanceDoc.forEach((assistance) => {
      assistance.ref.delete();
    });
  } catch (e) {
    console.log("Error deleteAgency:", e);
    return 'Error';
  }
}
