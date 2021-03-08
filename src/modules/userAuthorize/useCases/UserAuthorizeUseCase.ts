
import { IUser } from "../../../models/IUser";
import { IUserAuthorizeDataBase } from "../dataBase/UserAuthorizeDataBase";

export interface IUserAuthorizeUseCase {
    authorize: (name: string, hashPassword: string) => Promise<IUser | null>;
}

export class UserAuthorizeUseCase implements IUserAuthorizeUseCase {
    constructor(private userAuthorizeDataBase: IUserAuthorizeDataBase) {
    }

    authorize = async (email: string, hashPassword: string) => {
        try {
            const user = await this.userAuthorizeDataBase.findUserByEmailAndHashPassword(email, hashPassword);
            if (user) {
                delete user.hashPassword;
            }
            return user;
        } catch (error) {
            console.warn('UserAuthorizeUseCase -> authorize: ', error);
            return null;
        }
    }

}
