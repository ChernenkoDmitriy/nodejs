import { IRoomMember } from "../../types/IRoomMember";
import { ITeamRoom } from "../../types/ITeamRoom";

export interface ICreateRoom {
    createRoom: ( name: string, logo: string, members: IRoomMember[], admin: string) => ITeamRoom;
}
