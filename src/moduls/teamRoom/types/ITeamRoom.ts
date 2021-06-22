import { IRoomMember } from "./IRoomMember";

export interface ITeamRoom {
    uid: string;
    name: string;
    admin: string;
    members: IRoomMember[];
    logo: string;
}
