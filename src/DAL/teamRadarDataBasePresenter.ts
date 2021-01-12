import { ITeamRadar } from "../teamRadar/entites";
import { IDataBase } from "./dataBaseFile";

const TEAM_RADAR_PATH = './src/DAL/data/teamRadar.json';

export interface ITeamRadarDataBasePresenter {
    addTeamRadar: (teamRadar: ITeamRadar) => Promise<ITeamRadar | null>;
    updateTeamRadar: (teamRadar: ITeamRadar) => Promise<void>;
    getAllTeamRadars: () => Promise<ITeamRadar[] | null>;
    getTeamRadarByUid: (uid: string) => Promise<ITeamRadar | null>;
};

export class TeamRadarDataBasePresenter implements ITeamRadarDataBasePresenter {
    constructor(private dataBase: IDataBase) { };

    addTeamRadar = async (teamRadar: ITeamRadar): Promise<ITeamRadar | null> => {
        try {
            const teamRadars = await this.dataBase.readFile(TEAM_RADAR_PATH);
            teamRadars.push(teamRadar);
            await this.dataBase.writeToFile(TEAM_RADAR_PATH, teamRadars);
            return teamRadar;
        } catch (error) {
            console.warn('TeamRadarDataBasePresenter -> crecreateTeamRadarateRoom: ', error);
            return null;
        }
    };

    updateTeamRadar = async (teamRadar: ITeamRadar): Promise<void> => {
        try {
            const teamRadars: ITeamRadar[] = await this.dataBase.readFile(TEAM_RADAR_PATH);
            const newRadars = teamRadars.filter(item => item.uid !== teamRadar.uid);
            newRadars.push(teamRadar);
            await this.dataBase.writeToFile(TEAM_RADAR_PATH, newRadars);
        } catch (error) {
            console.warn('TeamRadarDataBasePresenter -> crecreateTeamRadarateRoom: ', error);
        }
    };

    getAllTeamRadars = async (): Promise<ITeamRadar[] | null> => {
        try {
            const teamRadars = await this.dataBase.readFile(TEAM_RADAR_PATH);
            return teamRadars;
        } catch (error) {
            console.warn('TeamRadarDataBasePresenter -> getTeamRadar: ', error);
            return null;
        }
    };

    getTeamRadarByUid = async (uid: string): Promise<ITeamRadar | null> => {
        try {
            let result = null;
            const teamRadars = await this.dataBase.readFile(TEAM_RADAR_PATH);
            if (teamRadars) {
                result = teamRadars.filter(radar => radar.uid === uid);
            }
            return result;
        } catch (error) {
            console.warn('TeamRadarDataBasePresenter -> getTeamRadar: ', error);
            return null;
        }
    };

};
