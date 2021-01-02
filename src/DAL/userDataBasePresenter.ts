import { IUser } from "../userUseCases/entites";
import { IDataBase } from "./dataBaseFile";

export interface IUserDataBasePresenter {
    userRegistration: (user: IUser) => Promise<boolean>;
    userAuthorization: (email: string, hashPassword: string) => Promise<IUser | undefined>;
    findUsers: (findBy: 'email' | 'phone' | 'name', value: string) => Promise<IUser[]>;
};

export class UserDataBasePresenter implements IUserDataBasePresenter {
    constructor(private dataBase: IDataBase) {

    };

    getUserById = async (userUid) => {

    };

    findUsers = async (findBy: 'email' | 'phone' | 'name', value: string) => {
        try {
            let result = [];
            const lowerCaseValue = value.toLowerCase();
            if (findBy === 'email' || findBy === 'phone' || findBy === 'name') {
                const users = await this.dataBase.getUsers();
                console.log('users ', users)
                result = await users.filter(user => user[findBy].toLowerCase().match(lowerCaseValue));
            }
            return result;
        } catch (error) {
            console.warn('DataBasePresenter -> userRegistration: ', error);
            return [];
        }
    };

    userRegistration = async (user: IUser): Promise<boolean> => {
        try {
            const isAdded = await this.dataBase.userRegistration(user);
            return isAdded;
        } catch (error) {
            console.warn('DataBasePresenter -> userRegistration: ', error);
            return false;
        }
    };

    userAuthorization = async (email: string, hashPassword: string): Promise<IUser | undefined> => {
        try {
            const users = await this.dataBase.getUsers();
            const user = users.find(item => (item.email === email && item.hashPassword === hashPassword));
            return user;
        } catch (error) {
            console.warn('DataBasePresenter -> userAuthorization: ', error);
        }
    };

};
