import { IDataBase } from "../../../DAL/IDataBase";
import { IRoom } from "../types/IRoom";

const ROOMS = './src/DAL/data/rooms.json';

export interface IRoomDataBase {
    getUserRooms: (userId: string) => Promise<IRoom[]>
    saveRoom: (room: IRoom) => Promise<IRoom>;
}

export class RoomDataBase implements IRoomDataBase {
    constructor(private dataBase: any) {

    }

    getUserRooms = async (userId: string) => {
        try {
            const rooms: IRoom[] = await this.dataBase.find({ "members.id": userId });
            return rooms;
        } catch (error) {
            console.warn('TeamRoomDataBase -> getUserRooms: ', error);
        }
    }

    saveRoom = async (room: IRoom) => {
        try {
            const roomDb = await this.dataBase.create(room);
            return roomDb;
        } catch (error) {
            console.warn('TeamRoomDataBase -> saveTeamRoom: ', error);
        }
    }

}
