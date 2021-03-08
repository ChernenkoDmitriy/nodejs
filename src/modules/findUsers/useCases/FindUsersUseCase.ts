
import { IUser } from "../../../models/IUser";
import { IFindUsersDataBase } from "../dataBase/FindUsersDataBase";

export interface IFindUsersUseCase {
    findUsers: (name: string, hashPassword: string) => Promise<IUser[] | null>;
}

export class FindUsersUseCase implements IFindUsersUseCase {
    constructor(private findUsersDataBase: IFindUsersDataBase) {
    }

    findUsers = async (searchedString: string, token: string) => {
        try {
            let result = [];
            const users:IUser[] = await this.findUsersDataBase.findUsers();
            if (users) {
                result = users.filter(user => user.name.toLowerCase().includes(searchedString.toLowerCase()) && user.token !== token);
                result.forEach(user => {
                    delete user.hashPassword;
                    delete user.token;
                });
            }
            return result;
        } catch (error) {
            console.warn('FindUsersUseCase -> findUsers: ', error);
            return null;
        }
    }

}
