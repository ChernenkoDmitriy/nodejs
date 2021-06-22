import { IResponse } from "../../../../../types/IResponse";
import { ICreateUser } from "../_ports/ICreateUser";
import { IGetIsUserExist } from "../_ports/IGetIsUserExist";
import { IGetUserForResponse } from "../_ports/IGetUserForResponse";
import { ISaveUser } from "../_ports/ISaveUser";

export interface IUserRegisterUseCase {
    register: (body: { name: string, phone: string, email: string, password: string }) => Promise<IResponse>;
}

export class UserRegisterUseCase implements IUserRegisterUseCase {
    constructor(
        private userRegistrationHelper: ICreateUser & IGetUserForResponse,
        private userDataBase: ISaveUser & IGetIsUserExist,
    ) { }

    register = async ({ name, password, email }) => {
        try {
            let result;
            const isExist = await this.userDataBase.getIsUserExist(email);
            if (isExist) {
                result = { error: 'User with this email already exist', status: 'error' };
            } else {
                const user = this.userRegistrationHelper.createUser(name, password, email);
                const dataBaseStatus = await this.userDataBase.saveUser(user);
                result = this.userRegistrationHelper.getUserForResponse(user, dataBaseStatus);
            }
            return result;
        } catch (error) {
            console.warn('UserRegisterUseCase -> register: ', error);
            const message = error && error.message ? error.message : '';
            return { status: 'error', error: error, message };
        }
    }

}
