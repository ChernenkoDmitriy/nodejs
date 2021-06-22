import { IDataBase } from "../../../DAL/IDataBase";
import { ITeamRoom } from "../types/ITeamRoom";
import { ISaveTeamRoom } from "../useCases/_ports/ISaveTeamRoom";

const ROOMS = './src/DAL/data/rooms.json';

export class TeamRoomDataBase implements ISaveTeamRoom {
    constructor(private dataBase: IDataBase) {

    }

    saveTeamRoom = async (room: ITeamRoom) => {
        try {
            let result = { isSuccessful: false, data: null, error: '' };
            const resultDataBase = await this.dataBase.write(ROOMS, room);
            result.isSuccessful = resultDataBase;
            return result;
        } catch (error) {
            console.warn('TeamRoomDataBase -> saveTeamRoom: ', error);
            return { isSuccessful: false, data: null, error: error };
        }
    }

}
