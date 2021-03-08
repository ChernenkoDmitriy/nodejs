import { IDataBase } from "../../../DAL/IDataBase";
import { IUser } from "../../../models/IUser";

export interface IUserRegisterDataBase {
    saveUser: (user: IUser) => Promise<IUser | undefined>
    findUserByEmailOrPhone: (email: string, phone: string) => Promise<IUser | undefined>
};

export class UserRegisterDataBase implements IUserRegisterDataBase {
    private USERS_PATH = './src/DAL/data/users.json';

    constructor(private dataBase: IDataBase) {

    }

    saveUser = async (user: IUser): Promise<IUser | undefined> => {
        try {
            const users: IUser[] = await this.dataBase.read(this.USERS_PATH);
            users.push(user);
            await this.dataBase.write(this.USERS_PATH, users)
            return user;
        } catch (error) {
            console.warn('UserRegisterDataBase -> saveUser: ', error);
            return undefined;
        }
    }

    findUserByEmailOrPhone = async (email: string, phone: string): Promise<IUser | undefined> => {
        try {
            const users: IUser[] = await this.dataBase.read(this.USERS_PATH);
            const user = users.find(item => (item.email === email || item.phone === phone));
            return user;
        } catch (error) {
            console.warn('UserRegisterDataBase -> findUserByEmailOrPhone: ', error);
            return undefined;
        }
    }

}
