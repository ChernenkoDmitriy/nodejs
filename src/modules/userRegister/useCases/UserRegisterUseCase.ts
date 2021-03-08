import { IUser } from "../../../models/IUser";
import { IUserRegisterDataBase } from "../dataBase/UserRegisterDataBase";
import { v4 as uuidv4 } from 'uuid';

export interface IUserRegisterUseCase {
    register: (name: string, phone: string, email: string, hashPassword: string) => Promise<IUser | null>;
}

export class UserRegisterUseCase implements IUserRegisterUseCase {
    constructor(private userRegisterDataBase: IUserRegisterDataBase) {
    }

    register = async (name: string, phone: string, email: string, hashPassword: string) => {
        try {
            const userFromBD = await this.userRegisterDataBase.findUserByEmailOrPhone(email, phone);
            if (userFromBD) {
                return null;
            }
            const user = this.createUser(name, phone, email, hashPassword);
            await this.userRegisterDataBase.saveUser(user);
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
