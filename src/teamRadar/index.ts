import { v4 as uuidv4 } from 'uuid';
import { ITeamRadarDataBasePresenter } from '../DAL/teamRadarDataBasePresenter';
import { ILogger } from '../logger';
import { IPeriodVoting, ITeamRadar, IUserVoting } from './entites';

export interface ITeamRadarManager {
    createRadar: (roomUid: string, valueFormatter: string[]) => Promise<ITeamRadar | null>;
    getRadarByRoomUid: (roomUid: string) => Promise<ITeamRadar[] | null>;
    getRadarByUid: (uid: string) => Promise<ITeamRadar | null>;
    createVoting: (uid: string) => Promise<boolean>;
    vote: (uid: string, periodVotingUid: string, userVoting: IUserVoting) => Promise<boolean>;
    closeVoting: (uid: string, periodVotingUid: string) => Promise<boolean>;
};

export class TeamRadarManager implements ITeamRadarManager {
    constructor(private dataBase: ITeamRadarDataBasePresenter, private logger: ILogger) {

    };

    createRadar = async (roomUid: string, valueFormatter: string[]): Promise<ITeamRadar | null> => {
        try {
            const teamRadar: ITeamRadar = {
                roomUid: roomUid,
                id: Date.now(),
                uid: uuidv4(),
                cratedAt: Date.now(),
                periodVotings: [],
                avarageVoting: [],
                valueFormatter,
            }
            const result = await this.dataBase.addTeamRadar(teamRadar);
            return result;
        } catch (error) {
            console.warn('TeamRadarManager -> createTeamRadar: ', error);
            return null;
        }
    };

    getRadarByRoomUid = async (roomUid: string): Promise<ITeamRadar[] | null> => {
        try {
            let result = null;
            const teamRadars = await this.dataBase.getAllTeamRadars();
            if (teamRadars) {
                result = teamRadars.filter(radar => radar.roomUid === roomUid);
            }
            return result;
        } catch (error) {
            console.warn('TeamRadarManager -> getRadarByRoomUid: ', error);
            return null;
        }
    };

    getRadarByUid = async (uid: string): Promise<ITeamRadar | null> => {
        try {
            let result = null;
            const teamRadars = await this.dataBase.getAllTeamRadars();
            if (teamRadars) {
                result = teamRadars.filter(radar => radar.uid === uid);
            }
            return result;
        } catch (error) {
            console.warn('TeamRadarManager -> getRadarByUid: ', error);
            return null;
        }
    };

    createVoting = async (uid: string): Promise<boolean> => {
        try {
            let result = false;
            const periodVoting: IPeriodVoting = {
                isClosed: false,
                periodVotingUid: uuidv4(),
                date: Date.now(),
                usersVotings: [],
            };
            const teamRadar = await this.getRadarByUid(uid);
            if (teamRadar) {
                teamRadar.periodVotings.push(periodVoting);
                await this.dataBase.updateTeamRadar(teamRadar);
                result = true;
            }
            return result;
        } catch (error) {
            console.warn('TeamRadarManager -> createVoting: ', error);
            return false;
        }
    };

    vote = async (uid: string, periodVotingUid: string, userVoting: IUserVoting): Promise<boolean> => {
        try {
            let isAdded = false;
            const teamRadar = await this.getRadarByUid(uid);
            if (teamRadar) {
                const validUserVoting = this.isValidUserVoting(userVoting, teamRadar.valueFormatter);
                if (teamRadar && validUserVoting) {
                    teamRadar.periodVotings.forEach(periodVoting => {
                        if (periodVoting.periodVotingUid === periodVotingUid && !periodVoting.isClosed) {
                            const isAlredyAdded = periodVoting.usersVotings.some(item => item.userUid === validUserVoting.userUid);
                            if (!isAlredyAdded) {
                                periodVoting.usersVotings.push(validUserVoting);
                                isAdded = true;
                            }
                        }
                    });
                    await this.dataBase.updateTeamRadar(teamRadar);
                }
            }
            return isAdded;
        } catch (error) {
            console.warn('TeamRadarManager -> vote: ', error);
            return false;
        }
    };

    closeVoting = async (uid: string, periodVotingUid: string): Promise<boolean> => {
        try {
            let isClosed = false;
            const teamRadar = await this.getRadarByUid(uid);
            if (teamRadar) {
                teamRadar.periodVotings.forEach(periodVoting => {
                    if (periodVoting.periodVotingUid === periodVotingUid && !periodVoting.isClosed) {
                        periodVoting.isClosed = true;
                        isClosed = true;
                    }
                });
                await this.dataBase.updateTeamRadar(teamRadar);
            }
            return isClosed;
        } catch (error) {
            console.warn('TeamRadarManager -> closeVoting: ', error);
            return false;
        }
    };


    private isValidUserVoting = (userVoting: IUserVoting, valueFormatter: string[]): IUserVoting | null => {
        let result = null;
        if (
            typeof userVoting.userUid === 'string' &&
            typeof userVoting.name === 'string' &&
            typeof userVoting.logo === 'string' &&
            typeof userVoting.periodUid === 'string' &&
            Array.isArray(userVoting.values) &&
            valueFormatter.length === userVoting.values.length &&
            userVoting.values.every(item => typeof item === 'number')
        ) {
            result = {
                values: userVoting.values,
                userUid: userVoting.userUid,
                name: userVoting.name,
                logo: userVoting.logo,
                periodUid: userVoting.periodUid,
            };
        }
        return result;
    };

};
