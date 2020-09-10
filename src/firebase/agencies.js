import { db } from "./config";

export const getAllAgencies = async () => {
  try {
    const docs = await db.collection("agencies").get();
    const agencies = [];
    docs.forEach((agency) => {
      agencies.push(agency.data());
    });
    return agencies;
  } catch (e) {
    console.log("Error getAllAgencies:", e);
  }
};

export const getAgency = async ({ agencyId }) => {
  try {
    const doc = await db.collection("agencies").doc(agencyId);
    const agency = await doc.get();

    if (agency.exists) {
      return agency.data();
    } else {
      return "DoesNotExisit";
    }
  } catch (e) {
    console.log("Error getAgency:", e);
  }
};

export const createAgency = async ({ agencyId }) => {
  try {
    const docRef = db.collection("agencies").doc(agencyId);
    await docRef.set({
      id: agencyId,
    });
    const agency = await docRef.get();
    if (agency.exists) {
      return agency.data();
    } else {
      return "DoesNotExisit";
    }
  } catch (e) {
    console.log("Error getAgency:", e);
  }
};

export const updateAgency = async ({ agency, data }) => {
  try {
    const docRef = db.collection("agencies").doc(agency?.id);
    await docRef.set({
      ...agency,
      ...data,
    });
    const agencyData = await docRef.get();
    if (agencyData.exists) {
      return agencyData.data();
    } else {
      return "DoesNotExisit";
    }
  } catch (e) {
    console.log("Error updateAgency:", e);
  }
};
