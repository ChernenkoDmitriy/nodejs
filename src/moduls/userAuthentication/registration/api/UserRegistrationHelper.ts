import { ICreateUser } from "../useCases/_ports/ICreateUser";
import { IGetUserForResponse } from "../useCases/_ports/IGetUserForResponse";
import { v4 as uuidv4 } from 'uuid';
import { IUser } from "../../types/IUser";

export class UserRegistrationHelper implements ICreateUser, IGetUserForResponse {

    createUser = (name: string, password: string, email: string) => {
        const user: IUser = { name, password, email, phone: '', logo: '', uid: uuidv4(), token: uuidv4() };
        return user;
    }

    getUserForResponse = (user: IUser, dataBaseStatus: { isSuccessful: boolean; error?: any; data?: any; }) => {
        let result;
        if (dataBaseStatus && dataBaseStatus.isSuccessful) {
            const data = { ...user };
            delete data.password;
            result = { status: 'ok', data };
        } else {
            result = { status: 'error', error: dataBaseStatus.error, message: 'Data base error' };
        }
        return result;
    }

}
