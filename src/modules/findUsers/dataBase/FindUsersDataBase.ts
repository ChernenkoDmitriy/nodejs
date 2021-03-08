import { IDataBase } from "../../../DAL/IDataBase";
import { IUser } from "../../../models/IUser";

export interface IFindUsersDataBase {
    findUsers: () => Promise<IUser[] | undefined>
}

export class FindUsersDataBase implements IFindUsersDataBase {
    private USERS_PATH = './src/DAL/data/users.json';

    constructor(private dataBase: IDataBase) {

    }

    findUsers = async (): Promise<IUser[] | undefined> => {
        try {
            const users: IUser[] = await this.dataBase.read(this.USERS_PATH);
            return users;
        } catch (error) {
            console.warn('FindUsersDataBase -> findUsers: ', error);
            return [];
        }
    }

}
