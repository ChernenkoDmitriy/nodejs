export interface IUser {
    name: string;
    phone: string;
    email: string;
    password: string;
    logo: string;
    uid: string;
    isActivated: boolean;
    activationLink: string;
    id?: string;
    _id?: string;
}
