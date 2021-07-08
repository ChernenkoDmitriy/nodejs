import { IRoomMember } from "./IRoomMember";

export interface IRoom {
    id?: string;
    _id?: string;
    uid: string;
    name: string;
    admin: string;
    members: IRoomMember[];
    logo: string;
    createdAt?: number;
}
