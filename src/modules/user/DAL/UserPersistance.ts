import { IUser } from "../types/IUser";
import { Types } from 'mongoose';

export interface IUserPersistance {
    findUsersByIds: (userIds: string[]) => Promise<IUser[]>;
    findUsers: (findBy: 'email' | 'name', value: string) => Promise<IUser[]>;
    saveUser: (user: IUser) => Promise<IUser>;
    getIsUserExist: (email: string) => Promise<boolean>;
    getUserByEmail: (email: string) => Promise<IUser>;
}

export class UserPersistance implements IUserPersistance {
    constructor(private dataBase: any) {

    }

    findUsersByIds = async (usersId: string[]) => {
        const ids = usersId.map(id => Types.ObjectId(id));
        const users = await this.dataBase.find({ '_id': { $in: ids } });
        return users;
    }

    findUsers = async (findBy: 'email' | 'name', value: string) => {
        const users = await this.dataBase.find({ [findBy]: { "$regex": value, "$options": "i" } });
        return users;
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
