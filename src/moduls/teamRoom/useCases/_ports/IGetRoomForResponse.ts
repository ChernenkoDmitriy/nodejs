import { ITeamRoom } from "../../types/ITeamRoom";

export interface IGetRoomForResponse {
    saveTeamRoom: (room: ITeamRoom, dataBaseStatus: { isSuccessful: boolean; error?: any; data?: any; }) => Promise<any>;
}
