import { db } from "./config";
import { ClientType, ClientListType } from '../../DataTypes';

type ClientIdType = { clientId: string };
type UpdateClientType = {
    client: any;
    data: any;
};

type CreateClientType = {
    data: ClientType;
}

export const getAllClients = async () => {
    try {
        const docs = await db.collection("clients").get();
        const clients: any = [];
        docs.forEach((client) => {
            clients.push(client.data());
        });
        return clients as ClientListType;
    } catch (e) {
        console.log("Error getAllClients:", e);
    }
};

export const getClient = async ({ clientId }: ClientIdType) => {
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

export const createClientData = async ({ data }: CreateClientType) => {
    try {
        const docRef = db.collection("clients").doc();
        await docRef.set({
            id: docRef?.id,
            ...data
        })
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

export const deleteClient = async ({ clientId }: { clientId: string }) => {
    try {
        const clientDoc = db.collection("agencies").doc(clientId);
        clientDoc.delete();

        const assistanceDoc = await db.collection("assistance").where("clientId", "==", clientId).get();
        assistanceDoc.forEach((assistance) => {
            assistance.ref.delete();
        });
    } catch (e) {
        console.log("Error deleteAgency:", e);
        return 'Error';
    }
}
