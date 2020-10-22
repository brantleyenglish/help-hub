import { db } from "./config";

export const getAllServices = async () => {
  try {
    const docs = await db.collection("services").get();
    const services = [];
    docs.forEach((agency) => {
      services.push(agency.data());
    });
    return services;
  } catch (e) {
    console.log("Error getAllservices:", e);
  }
};

export const getService = async ({ serviceId }) => {
  try {
    const doc = await db.collection("services").doc(serviceId);
    const service = await doc.get();

    if (service.exisits) {
      return service.data();
    } else {
      return false;
    }
  } catch (e) {
    console.log("Error getService:", e);
  }
};
