import { ITeamRoom } from "../../types/ITeamRoom";

export interface ISaveTeamRoom {
    saveTeamRoom: (room: ITeamRoom) => Promise<{ isSuccessful: boolean; }>;
}
