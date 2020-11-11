import { db } from "./config";

import {MessageListType} from '../../DataTypes';

type GetAgencyMessagesType ={
  agencyId: string;
}

export const getPublicMessages = async () => {
  try {
    const docs = await db.collection("messages").where("isPrivate", "==", false).get();
    const messages: any = [];
    docs.forEach((message) => {
        messages.push(message.data());
    });
    return messages as MessageListType;
  } catch (e) {
    console.log("Error getAllservices:", e);
    return 'Error';
  }
};

export const getAgencyMessages = async ({ agencyId }: GetAgencyMessagesType) => {
    console.log({agencyId})
  try {
    const docs = await db.collection("messages").where("agencyId", "==", agencyId).get();
    const messages: any = [];
    docs.forEach((message) => {
        messages.push(message.data());
    });
    return messages as MessageListType;
  } catch (e) {
    console.log("Error getService:", e);
    return "Error";
  }
}