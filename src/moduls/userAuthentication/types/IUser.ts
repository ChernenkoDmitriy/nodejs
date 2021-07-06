export interface IUser {
    name: string;
    phone: string;
    email: string;
    password: string;
    logo:string;
    id?: number;
    uid: string;
    isActivated: boolean;
    activationLink: string;
}
