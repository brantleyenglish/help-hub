import React from "react";

import {

} from "../firebase/clients";

import { useAuth } from "./AuthContext";

type ClientType = {
    city: string;
    contactFirstName: string;
    contactLastName: string;
    description: string;
    id: string;
    name: string;
    phone: string;
    streetAddress: string;
    website: string;
    zip: string;
}

type ClientListType = ClientType[];