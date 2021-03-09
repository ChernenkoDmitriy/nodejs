import { IRoomDataBase } from "../../../DAL/RoomDataBase/IRoomDataBase";
import { IRoom } from "../../../models/IRoom";

export interface IGetRoomsUseCase {
    getRoomsByUserUid: (userUid: string) => Promise<IRoom[] | null>;
}

export class GetRoomsUseCase implements IGetRoomsUseCase {
    constructor(private roomDataBase: IRoomDataBase) {
    }

    getRoomsByUserUid = async (userUid: string) => {
        try {
            const rooms: IRoom[] = await this.roomDataBase.getRooms();
            const userRooms = rooms.filter(room => room.members.some(member => member.uid === userUid));
            return userRooms;
        } catch (error) {
            console.warn('GetRoomsUseCase -> getRoomsByUserUid: ', error);
            return null;
        }
    }

}
