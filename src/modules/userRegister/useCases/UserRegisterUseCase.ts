import { IUser } from "../../../models/IUser";
import { v4 as uuidv4 } from 'uuid';
import { IUserDataBase } from "../../../DAL/UserDataBase/IUserDataBase";

export interface IUserRegisterUseCase {
    register: (name: string, phone: string, email: string, hashPassword: string) => Promise<IUser | null>;
}

export class UserRegisterUseCase implements IUserRegisterUseCase {
    constructor(private userDataBase: IUserDataBase) {
    }

    register = async (name: string, phone: string, email: string, hashPassword: string) => {
        try {
            const userFromBD = await this.userDataBase.findUserByEmailOrPhone(email, phone);
            if (userFromBD) {
                return null;
            }
            const user = this.createUser(name, phone, email, hashPassword);
            await this.userDataBase.saveUser(user);
            delete user.hashPassword;
            return user;
        } catch (error) {
            console.warn('UserRegisterUseCase -> register: ', error);
            return null;
        }
    }

    private createUser = (name: string, phone: string, email: string, hashPassword: string): IUser => {
        const user: IUser = { email, name, phone, hashPassword, id: Date.now(), uid: uuidv4(), token: uuidv4(), logo: '' };
        return user;
    }

}
