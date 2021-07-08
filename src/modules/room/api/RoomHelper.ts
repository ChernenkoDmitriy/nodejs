import { v4 as uuidv4 } from 'uuid';
import { IRoom } from "../types/IRoom";
import { IRoomMember } from '../types/IRoomMember';

export interface IRoomHelper {
    getDtoRoom: (room: IRoom) => { name: string, admin: string, members: IRoomMember[], logo: string, uid: string, id: string };
    getDtoRooms: (rooms: IRoom[]) => { name: string, admin: string, members: IRoomMember[], logo: string, uid: string, id: string }[];
    createRoom: (name: string, logo: string, members: IRoomMember[], admin: string) => IRoom;
}

export class RoomHelper implements IRoomHelper {

    getDtoRoom = ({ name, admin, members, logo, uid, _id }: IRoom) => {
        return { name, admin, members, logo, uid, id: _id };
    }

    getDtoRooms = (rooms: IRoom[]) => {
        const roomsDto = rooms.map(room => this.getDtoRoom(room));
        return roomsDto;
    }

    createRoom = (name: string, logo: string, members: IRoomMember[], admin: string) => {
        const room: IRoom = { name, admin, members, logo, uid: uuidv4(), createdAt: Date.now() };
        return room;
    };

}
