import { IUser } from "../../types/IUser";

export interface ICreateUser {
    createUser: (name: string, password: string, email: string) => Promise<IUser>;
}
