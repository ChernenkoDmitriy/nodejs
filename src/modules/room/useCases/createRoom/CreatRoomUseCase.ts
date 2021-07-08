import { IAddListenerSocket, ISendToMany, SOCKET_EVENTS } from "../../../../socketIO";
import { IRoomHelper } from "../../api/RoomHelper";
import { IRoomDataBase } from "../../DAL/RoomDataBase";
import { IRoomMember } from "../../types/IRoomMember";

export interface ICreateRoomUseCase {
    createRoom: (body: { name: string, logo: string, members: IRoomMember[], admin: string }) => Promise<void>;
}

export class CreateRoomUseCase implements ICreateRoomUseCase {
    constructor(
        private roomHelper: IRoomHelper,
        private roomDataBase: IRoomDataBase,
        private socket: ISendToMany & IAddListenerSocket,
    ) {
        this.socket.addListener(SOCKET_EVENTS.CREATE_ROOM, this.createRoom);
    }

    createRoom = async ({ name, logo, members, admin }) => {
        try {
            const room = this.roomHelper.createRoom(name, logo, members, admin);
            await this.roomDataBase.saveRoom(room);
            const usersId = members.map(member => member.uid);
            this.socket.sendToMany(usersId, SOCKET_EVENTS.CREATE_ROOM, room);
        } catch (error) {
            console.warn('UserRegisterUseCase -> register: ', error);
        }
    }

}
