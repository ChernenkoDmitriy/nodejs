
import { IRoom } from "../../models/IRoom";
import { IDataBase } from "../IDataBase";
import { IRoomDataBase } from "./IRoomDataBase";

export class RoomDataBase implements IRoomDataBase {
    private USERS_PATH = './src/DAL/data/rooms.json';

    constructor(private dataBase: IDataBase) {

    }

    getRooms = async (): Promise<IRoom[]> => {
        try {
            const rooms = await this.dataBase.read(this.USERS_PATH);
            return rooms;
        } catch (error) {
            console.warn('CreateRoomDataBase -> getRooms: ', error);
            return [];
        }
    }

    writeRooms = async (rooms: IRoom[]): Promise<void> => {
        try {
            await this.dataBase.write(this.USERS_PATH, rooms);
        } catch (error) {
            console.warn('CreateRoomDataBase -> createRoom: ', error);
        }
    }

}
