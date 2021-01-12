export type IMember = {
    name: string;
    email: string;
    uid: string;
    id: number;
    logo: string;
    phone: string;
    isOnline: boolean;
};

export interface IRoom {
    uid: string;
    id: number;
    name: string;
    createdAt: number;
    admin: string;
    members: IMember[];
    logo: string;
};
