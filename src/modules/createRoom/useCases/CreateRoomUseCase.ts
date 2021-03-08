import { v4 as uuidv4 } from 'uuid';
import { ICreateRoomDataBase } from "../dataBase/CreateRoomDataBase";
import { IRoom } from "../../../models/IRoom";
import { IMember } from "../../../models/IMember";

export interface ICreateRoomUseCase {
    createRoom: (name: string, admin: string, members: IMember[], logo: string) => Promise<IRoom | null>;
}

export class CreateRoomUseCase implements ICreateRoomUseCase {
    constructor(private createRoomDataBase: ICreateRoomDataBase) {
    }

    createRoom = async (name: string, admin: string, members: IMember[], logo: string) => {
        try {
            const rooms: IRoom[] = await this.createRoomDataBase.getRooms();
            const room: IRoom = { name, admin, members, logo, uid: uuidv4(), id: Date.now() };
            rooms.push(room);
            await this.createRoomDataBase.writeRooms(rooms);
            return room;
        } catch (error) {
            console.warn('UserRegisterUseCase -> register: ', error);
            return null;
        }
    }

}
