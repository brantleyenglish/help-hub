import { db } from "./config";

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
