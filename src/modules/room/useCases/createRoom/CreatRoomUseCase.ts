import { ISendByTokens } from "../../../../messaging/IMessaging/ISendByTokens";
import { IResponse } from "../../../../types/IResponse";
import { INotificationPersistance } from "../../../notification/DAL/NotificationPersistance";
import { IRoomHelper } from "../../api/RoomHelper";
import { IRoomPersistance } from "../../DAL/RoomDataBase";
import { IRoomMember } from "../../types/IRoomMember";

export interface ICreateRoomUseCase {
    createRoom: (body: { name: string, logo: string, members: IRoomMember[], admin: string }) => Promise<IResponse>;
}

export class CreateRoomUseCase implements ICreateRoomUseCase {
    constructor(
        private roomHelper: IRoomHelper,
        private roomPersistance: IRoomPersistance,
        private messaging: ISendByTokens,
        private notificationPersistance: INotificationPersistance,
    ) { }

    createRoom = async ({ name, logo, members, admin }) => {
        try {
            let result = { status: 'error', data: null };
            const room = this.roomHelper.createRoom(name, logo, members, admin);
            const roomDb = await this.roomPersistance.saveRoom(room);
            if (roomDb) {
                const roomDto = this.roomHelper.getDtoRoom(roomDb);
                const usersId = members.map(member => member.id);
                const fcmTokens = await this.notificationPersistance.getFCMTokensByUsersId(usersId);
                const tokens = fcmTokens.map(token => token.token);
                this.messaging.sendByTokens(tokens, name, 'Welcome to room', { roomId: roomDto.id, event: 'create_room' });
                result = { status: 'ok', data: roomDto };
            }
            return result;
        } catch (error) {
            console.warn('UserRegisterUseCase -> register: ', error);
            const message = error && error.message ? error.message : '';
            return { status: 'error', error: error, message };
        }
    }

}
