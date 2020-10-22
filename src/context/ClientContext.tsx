import React from "react";

import {

} from "../firebase/clients";

import { useAuth } from "./AuthContext";

type ClientType = {
    additionalNotes: string;
    address: string;
    county: string;
    dob: string;
    email: string;
    ethnicity: string;
    gender: string;
    name: string;
    phone: string;
}

type ClientListType = ClientType[];