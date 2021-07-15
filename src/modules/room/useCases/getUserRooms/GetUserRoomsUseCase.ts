import { IResponse } from "../../../../types/IResponse";
import { IRoomHelper } from "../../api/RoomHelper";
import { IRoomPersistance } from "../../DAL/RoomDataBase";

export interface IGetUserRoomsUseCase {
    getUserRooms: (body: { userId: string }) => Promise<IResponse>;
}

export class GetUserRoomsUseCase implements IGetUserRoomsUseCase {
    constructor(
        private roomHelper: IRoomHelper,
        private roomDataBase: IRoomPersistance,
        ) {
    }

    getUserRooms = async ({ userId }) => {
        try {
            const rooms = await this.roomDataBase.getUserRooms(userId);
            const roomsDto = this.roomHelper.getDtoRooms(rooms);
            return { status: 'ok', data: roomsDto };
        } catch (error) {
            console.warn('GetUserRoomsUseCase -> getUserRooms: ', error);
            const message = error && error.message ? error.message : '';
            return { status: 'error', error: error, message };
        }
    }

}
