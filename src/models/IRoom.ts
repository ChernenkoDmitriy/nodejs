import { IMember } from "./IMember";

export interface IRoom {
    uid: string;
    id: number;
    name: string;
    admin: string;
    members: IMember[];
    logo: string;
};