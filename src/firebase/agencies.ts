import { db } from "./config";
import {AgencyType, AgencyListType} from '../../DataTypes';

type AgencyIdType = {agencyId: string};

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
