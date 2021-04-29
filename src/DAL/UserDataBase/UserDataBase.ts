import { IUser } from "../../models/IUser";
import { IDataBase } from "../IDataBase";
import { IUserDataBase } from "./IUserDataBase";


export class UserDataBase implements IUserDataBase {
    private USERS = './src/DAL/data/users.json';

    constructor(private dataBase: IDataBase) {

    }

    findUsers = async (): Promise<IUser[] | undefined> => {
        try {
            const users: IUser[] = await this.dataBase.read(this.USERS);
            return users;
        } catch (error) {
            console.warn('FindUsersDataBase -> findUsers: ', error);
            return [];
        }
    }

    saveUser = async (user: IUser): Promise<IUser | undefined> => {
        try {
            const users: IUser[] = await this.dataBase.read(this.USERS);
            users.push(user);
            await this.dataBase.write(this.USERS, users)
            return user;
        } catch (error) {
            console.warn('UserRegisterDataBase -> saveUser: ', error);
            return undefined;
        }
    }

    findUserByEmailOrPhone = async (email: string, phone: string): Promise<IUser | undefined> => {
        try {
            const users: IUser[] = await this.dataBase.read(this.USERS);
            const user = users.find(item => (item.email === email || item.phone === phone));
            return user;
        } catch (error) {
            console.warn('UserRegisterDataBase -> findUserByEmailOrPhone: ', error);
            return undefined;
        }
    }

    findUserByEmailAndHashPassword = async (email: string, hashPassword: string): Promise<IUser | undefined> => {
        try {
            const users: IUser[] = await this.dataBase.read(this.USERS);
            const user = users.find(item => (item.email === email || item.hashPassword === hashPassword));
            return user;
        } catch (error) {
            console.warn('UserAuthorizeDataBase -> findUserByEmailAndHashPassword: ', error);
            return undefined;
        }
    }

}
