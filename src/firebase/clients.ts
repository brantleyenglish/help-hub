import { db } from "./config";
import { ClientType, ClientListType } from '../../DataTypes';

type ClientIdType = { clientId: string };
type UpdateClientType = {
    cientId: string;
    data: any;
};

export const getAllClients = async () => {
    try {
        const docs = await db.collection("clients").get();
        const clients = [];
        docs.forEach((client) => {
            clients.push(client.data());
        });
        return clients as ClientListType;
    } catch (e) {
        console.log("Error getAllClients:", e);
    }
};

export const getClient = async ({ clientID }: ClientIdType) => {
    try {
        const doc = await db.collection("clients").doc(clientId);
        const client = await doc.get();

        if (client.exists) {
            return client.data() as ClientType;
        } else {
            return "DoesNotExist";
        }
    } catch (e) {
        console.log("Error getClient:", e);
    }
};

export const createClient = async ({ clientId }: ClientIdType) => {
    try {
        const docRef = db.collection("clients").doc(clientId);
        await docRef.set({
            id: clientId,
        });
        const client = await docRef.get();
        if (client.exists) {
            return client.data();
        } else {
            return "DoesNotExisit";
        }
    } catch (e) {
        console.log("Error createClient:", e);
    }
};


export const updateClient = async ({ client, data }: UpdateClientType) => {
    try {
        const docRef = db.collection("clients").doc(client?.id);
        await docRef.set({
            ...client,
            ...data,
        });
        const clientData = await docRef.get();
        if (clientData.exists) {
            return clientData.data();
        } else {
            return "DoesNotExisit";
        }
    } catch (e) {
        console.log("Error updateClient:", e);
    }
};
