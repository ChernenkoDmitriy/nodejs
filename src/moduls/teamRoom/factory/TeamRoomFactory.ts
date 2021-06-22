import { DataBaseFile } from "../../../DAL/dataBaseFile";
import { TeamRoomHelper } from "../api/TeamRoomHelper";
import { TeamRoomDataBase } from "../DAL/TeamRoomDataBase";
import { UserRegisterUseCase } from "../useCases/createRoom/CreatRoomUseCase";

export interface ITeamRoomFactory {
    // readonly routeName: string;
    // readonly validator: any[];
    // readonly request: (req: any, res: any) => Promise<void>;
}

export class TeamRoomFactory {
    private static presenter: ITeamRoomFactory;

    static get() {
        if (!TeamRoomFactory.presenter) {
            TeamRoomFactory.presenter = new TeamRoomFactory().createPresenter();
        }
        return TeamRoomFactory.presenter;
    }

    private createPresenter = () => {
        const dataBase = new DataBaseFile();
        const teamRoomDataBase = new TeamRoomDataBase(dataBase);
        const teamRoomHelper = new TeamRoomHelper();
        return null;
    }

    private createRoom = (teamRoomHelper, teamRoomDataBase) => {
        const userRegisterUseCase = new UserRegisterUseCase(teamRoomHelper, teamRoomDataBase)
    }

}
