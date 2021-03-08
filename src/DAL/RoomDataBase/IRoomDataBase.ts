import { IRoom } from "../../models/IRoom";

export interface IRoomDataBase {
    getRooms: () => Promise<IRoom[]>;
    writeRooms: (rooms: IRoom[]) => Promise<void>;
}