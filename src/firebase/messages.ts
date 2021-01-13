import { db } from "./config";

import { MessageListType, MessageType } from '../../DataTypes';

type GetAgencyMessagesType = {
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
    const docRef = db.collection("messages").doc();
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

export const updateMessage = async ({ data }: CreateMessageType) => {
  try {
    const docRef = db.collection("messages").doc(data?.id);
    await docRef.set(data);
    const messageData = await docRef.get();
    if (messageData.exists) {
      return messageData.data() as MessageType;
    } else {
      return "DoesNotExist";
    }
  } catch (e) {
    console.log("Error updateAgency:", e);
    return "Error";
  }
};

export const deleteMessage = async ({ messageId }: { messageId: string }) => {
  try {
    const assistanceDoc = db.collection("messages").doc(messageId);
    assistanceDoc.delete();
  } catch (e) {
    console.log("Error deleteMessage:", e);
    return 'Error';
  }
}
