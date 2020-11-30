import { db } from "./config";

import {ServiceListType, ServiceType} from '../../DataTypes';

type GetServiceType ={
  serviceId: string;
}

type GetServicesByAgencyIdType = {
  agencyId: string;
}

export const getAllServices = async () => {
  try {
    const docs = await db.collection("services").get();
    const services: any = [];
    docs.forEach((agency) => {
      services.push(agency.data());
    });
    return services as ServiceListType;
  } catch (e) {
    console.log("Error getAllservices:", e);
    return 'Error';
  }
};

export const getService = async ({ serviceId }: GetServiceType) => {
  try {
    const doc = await db.collection("services").doc(serviceId);
    const service = await doc.get();

    if (service.exists) {
      return service.data() as ServiceType;
    } else {
      return false;
    }
  } catch (e) {
    console.log("Error getService:", e);
    return "Error";
  }
};

export const getServicesByAgencyId = async ({ agencyId }: GetServicesByAgencyIdType) => {
  try {
    const docs = await db.collection("services").where("agencyId", "==", agencyId).get();
    const services: any = [];
    docs.forEach((service) => {
      services.push(service.data());
    });
    return services as ServiceListType;
  } catch (e) {
    console.log("Error getAssistanceByAgency:", e);
    return 'Error';
  }
};
