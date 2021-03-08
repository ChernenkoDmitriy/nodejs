
import { IUser } from "../../../models/IUser";
import { IUserAuthorizeDataBase } from "../dataBase/UserAuthorizeDataBase";

export interface IGetRoomsUseCase {
    authorize: (name: string, hashPassword: string) => Promise<IUser | null>;
}

export class GetRoomsUseCase implements IGetRoomsUseCase {
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
