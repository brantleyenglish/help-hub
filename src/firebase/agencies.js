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

    if (agency.exisits) {
      return agency.data();
    } else {
      return false;
    }
  } catch (e) {
    console.log("Error getAgency:", e);
  }
};
