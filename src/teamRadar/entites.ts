export interface IUserVoting {
    values: number[];
    userUid: string;
    name: string;
    logo: string;
    periodUid: string;
};

export interface IPeriodVoting {
    isClosed: boolean;
    periodVotingUid: string;
    date: number;
    usersVotings: IUserVoting[];
};

export interface ITeamRadar {
    id: number;
    uid: string;
    cratedAt: number;
    roomUid: string;
    periodVotings: IPeriodVoting[];
    avarageVoting: number[];
    valueFormatter: string[];
};
