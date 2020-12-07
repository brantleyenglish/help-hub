import { db } from "./config";

import {MessageListType, MessageType} from '../../DataTypes';

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

type CreateMessageType = {
  data: MessageType;
}

export const createMessage = async ({ data }: CreateMessageType) => {
  try {
      const docRef =  db.collection("messages").doc();
      await docRef.set({
        id: docRef?.id,
        ...data
      })
      const message = await docRef.get();
      if (message.exists) {
          return message.data();
      } else {
          return "DoesNotExisit";
      }
  } catch (e) {
      console.log("Error createClient:", e);
  }
};
