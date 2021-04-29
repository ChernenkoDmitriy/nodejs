import { IUser } from "../../models/IUser";

export interface IUserDataBase {
    findUsers: () => Promise<IUser[] | undefined>;
    saveUser: (user: IUser) => Promise<IUser | undefined>;
    findUserByEmailOrPhone: (email: string, phone: string) => Promise<IUser | undefined>;
    findUserByEmailAndHashPassword: (email: string, phone: string) => Promise<IUser | undefined>;
}