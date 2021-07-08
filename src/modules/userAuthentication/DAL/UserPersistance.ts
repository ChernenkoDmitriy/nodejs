import { IUser } from "../types/IUser";
import { IDatabaseResponse } from "../../../types/IDatabaseResponse";

export interface IUserPersistance {
    saveUser: (user: IUser) => Promise<IUser>;
    getIsUserExist: (email: string) => Promise<boolean>;
    getUserByEmail: (email: string) => Promise<IUser>;
}

export class UserPersistance implements IUserPersistance {
    constructor(private dataBase: any) {

    }

    getIsUserExist = async (email: string) => {
        const candidate = await this.dataBase.findOne({ email });
        return !!candidate;
    }

    saveUser = async (user: IUser) => {
        const userDb = await this.dataBase.create(user);
        return userDb;
    }

    getUserByEmail = async (email: string) => {
        const candidate = await this.dataBase.findOne({ email });
        return candidate;
    }

}
