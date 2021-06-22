import { IRoomMember } from "../types/IRoomMember";
import { ICreateRoom } from "../useCases/_ports/ICreateRoom";
import { v4 as uuidv4 } from 'uuid';
import { ITeamRoom } from "../types/ITeamRoom";

export class TeamRoomHelper implements ICreateRoom {

    createRoom = (name: string, logo: string, members: IRoomMember[], admin: string) => {
        const user: ITeamRoom = { name, admin, members, logo, uid: uuidv4() };
        return user;
    };

}
