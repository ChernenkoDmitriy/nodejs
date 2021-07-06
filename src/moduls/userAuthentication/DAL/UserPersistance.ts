import { IDataBase } from "../../../DAL/IDataBase";
import { IUser } from "../types/IUser";
import { ISaveUser } from "../useCases/_ports/ISaveUser";
import { IGetIsUserExist } from "../useCases/_ports/IGetIsUserExist";
import { IGetUserByEmail } from "../useCases/_ports/IGetUserByEmail";
const bcrypt = require('bcryptjs');

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
            result.data = user;
            return result;
        } catch (error) {
            console.warn('UserPersistance -> saveUser: ', error);
            return { isSuccessful: false, data: null, error: error };
        }
    }

    getUserByEmail = async (email: string, password: string) => {
        try {
            let result = { isSuccessful: false, data: null, error: '', messageKey: '' };
            const users: IUser[] | undefined = await this.dataBase.read(USERS);
            if (Array.isArray(users)) {
                const user = users.find(user => (user.email === email));
                const isPassEquals = await bcrypt.compare(password, user.password); 
                if (user && isPassEquals) {
                    result.data = user;
                    result.isSuccessful = true;
                } else {
                    result.messageKey = 'user_not_found';
                }
            }
            return result;
        } catch (error) {
            console.warn('UserPersistance -> getUserByEmail: ', error);
            return { isSuccessful: false, data: null, error: error };
        }
    }

}
