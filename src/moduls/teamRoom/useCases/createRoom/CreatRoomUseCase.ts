import { IResponse } from "../../../../types/IResponse";
import { IRoomMember } from "../../types/IRoomMember";
import { ICreateRoom } from "../_ports/ICreateRoom";
import { ISaveTeamRoom } from "../_ports/ISaveTeamRoom";

export interface IUserRegisterUseCase {
    createTeamRoom: (body: { name: string, logo: string, members: IRoomMember[], admin: string }) => Promise<IResponse>;
}

export class UserRegisterUseCase implements IUserRegisterUseCase {
    constructor(
        private teamRoomHelper: ICreateRoom,
        private teamRoomDataBase: ISaveTeamRoom,
        // private userInformer: ISend,
    ) { }

    createTeamRoom = async ({ name, logo, members, admin }) => {
        try {
            const teamRoom = this.teamRoomHelper.createRoom(name, logo, members, admin);
            const dataBaseStatus = await this.teamRoomDataBase.saveTeamRoom(teamRoom);
            // if(dataBaseStatus.isSuccessful){
            //     teamRoom.members.forEach(member => this.userInformer.informMember(member, teamRoom))
            // }
        } catch (error) {
            console.warn('UserRegisterUseCase -> register: ', error);
            const message = error && error.message ? error.message : '';
            return { status: 'error', error: error, message };
        }
    }

}
