import { IDataBase } from "../../../DAL/IDataBase";
import { IUser } from "../../../models/IUser";

export interface IUserAuthorizeDataBase {
    findUserByEmailAndHashPassword: (email: string, phone: string) => Promise<IUser | undefined>
}

export class UserAuthorizeDataBase implements IUserAuthorizeDataBase {
    private USERS_PATH = './src/DAL/data/users.json';

    constructor(private dataBase: IDataBase) {

    }

    findUserByEmailAndHashPassword = async (email: string, hashPassword: string): Promise<IUser | undefined> => {
        try {
            const users: IUser[] = await this.dataBase.read(this.USERS_PATH);
            const user = users.find(item => (item.email === email || item.hashPassword === hashPassword));
            return user;
        } catch (error) {
            console.warn('UserAuthorizeDataBase -> findUserByEmailAndHashPassword: ', error);
            return undefined;
        }
    }

}
