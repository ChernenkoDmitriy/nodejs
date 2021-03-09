import { IRoomDataBase } from "../../../DAL/RoomDataBase/IRoomDataBase";
import { IRoom } from "../../../models/IRoom";

export interface IGetRoomUseCase {
    getRoomByUid: (roomUid: string) => Promise<IRoom | null>;
}

export class GetRoomUseCase implements IGetRoomUseCase {
    constructor(private roomDataBase: IRoomDataBase ) {
    }

    getRoomByUid = async (roomUid: string) => {
        try {
            const rooms: IRoom[] = await this.roomDataBase.getRooms();
            const room: IRoom = rooms.find(room=>room.uid === roomUid);
            return room;
        } catch (error) {
            console.warn('UserRegisterUseCase -> getRoom: ', error);
            return null;
        }
    }

}
