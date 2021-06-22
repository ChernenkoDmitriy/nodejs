import { IDataBase } from "../../../DAL/IDataBase";
import { IUser } from "../types/IUser";
import { ISaveUser } from "../registration/useCases/_ports/ISaveUser";
import { IGetUserByEmail } from "../authorization/useCases/_ports/IGetUserByEmail";
import { IGetIsUserExist } from "../registration/useCases/_ports/IGetIsUserExist";

const USERS = './src/DAL/data/users.json';

export class UserPersistance implements ISaveUser, IGetUserByEmail, IGetIsUserExist {
    constructor(private dataBase: IDataBase) {

    }

    getIsUserExist = async (email: string) => {
        let result = false;
        const users: IUser[] | undefined = await this.dataBase.read(USERS);
        if (Array.isArray(users)) {
            const user = users.find(savedUser => (savedUser.email === email));
            result = !!user;
        }
        return result;
    }

    saveUser = async (user: IUser) => {
        try {
            let result = { isSuccessful: false, data: null, error: '' };
            const resultDataBase = await this.dataBase.write(USERS, user);
            result.isSuccessful = resultDataBase;
            return result;
        } catch (error) {
            console.warn('UserPersistance -> saveUser: ', error);
            return { isSuccessful: false, data: null, error: error };
        }
    }

    getUserByEmail = async (email: string, password: string) => {
        try {
            let result = { isSuccessful: false, data: null, error: '' };
            const users: IUser[] | undefined = await this.dataBase.read(USERS);
            if (Array.isArray(users)) {
                const user = users.find(user => (user.email === email && user.password === password));
                if (user) {
                    result.data = user;
                    result.isSuccessful = true;
                } else {
                    result.error = 'User not found';
                }
            }
            return result;
        } catch (error) {
            console.warn('UserPersistance -> getUserByEmail: ', error);
            return { isSuccessful: false, data: null, error: error };
        }
    }

}
