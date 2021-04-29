
import { IUserDataBase } from "../../../DAL/UserDataBase/IUserDataBase";
import { IUser } from "../../../models/IUser";

export interface IFindUsersUseCase {
    findUsers: (name: string, hashPassword: string) => Promise<IUser[] | null>;
}

export class FindUsersUseCase implements IFindUsersUseCase {
    constructor(private userDataBase: IUserDataBase) {
    }

    findUsers = async (searchedString: string, token: string) => {
        try {
            let result = [];
            const users:IUser[] = await this.userDataBase.findUsers();
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
