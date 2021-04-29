
import { IUserDataBase } from "../../../DAL/UserDataBase/IUserDataBase";
import { IUser } from "../../../models/IUser";

export interface IUserAuthorizeUseCase {
    authorize: (name: string, hashPassword: string) => Promise<IUser | null>;
}

export class UserAuthorizeUseCase implements IUserAuthorizeUseCase {
    constructor(private userDataBase: IUserDataBase) {
    }

    authorize = async (email: string, hashPassword: string) => {
        try {
            const user = await this.userDataBase.findUserByEmailAndHashPassword(email, hashPassword);
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
