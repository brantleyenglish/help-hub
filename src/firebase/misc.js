import { db } from "./config";

export const getSettings = async (keyValue) => {
  try {
    const docRef = db.collection("misc").doc("settings");
    const doc = await docRef.get();
    const settings = doc.data();
    if (keyValue) {
      return settings[keyValue];
    } else {
      return settings;
    }
  } catch (e) {
    console.log("Error getAgency:", e);
  }
};
