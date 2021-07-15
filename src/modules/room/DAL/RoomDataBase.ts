import { IRoom } from "../types/IRoom";

export interface IRoomPersistance {
    getRoom: (roomId: string) => Promise<IRoom>;
    getUserRooms: (userId: string) => Promise<IRoom[]>
    saveRoom: (room: IRoom) => Promise<IRoom>;
}

export class RoomDataBase implements IRoomPersistance {
    constructor(private dataBase: any) {

    }

    getRoom = async (roomId: string) => {
        try {
            const room: IRoom = await this.dataBase.findOne({ _id: roomId });
            return room;
        } catch (error) {
            console.warn('TeamRoomDataBase -> getRoom: ', error);
        }
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
