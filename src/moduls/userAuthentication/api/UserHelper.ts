import { IUser } from "../types/IUser";
import { v4 as uuidv4 } from 'uuid';
import { IGenerateTokens } from "../useCases/_ports/IGenerateTokens";
import { IDatabaseResponse } from "../../../types/IDatabaseResponse";
import { IResponse } from "../../../types/IResponse";
const bcrypt = require('bcryptjs');

export interface IUserHelper {
    createUser: (name: string, password: string, email: string) => Promise<IUser>;
    getUserForResponse: (dataBaseStatus: IDatabaseResponse) => IResponse;
    getDtoUser: (user: IUser) => { email: string, uid: string };
}

export class UserHelper implements IUserHelper {

    getDtoUser = ({ email, uid, name, phone, logo }: IUser) => {
        return { email, uid, name, phone, logo };
    }

    createUser = async (name: string, password: string, email: string) => {
        const hashPassword = await bcrypt.hash(password, 10);
        const user: IUser = {
            name,
            password: hashPassword,
            email,
            phone: '',
            logo: '',
            uid: uuidv4(),
            isActivated: false,
            activationLink: uuidv4(),
        };
        return user;
    }

    getUserForResponse = (dataBaseStatus: IDatabaseResponse) => {
        let result;
        if (dataBaseStatus && dataBaseStatus.isSuccessful) {
            const user = dataBaseStatus.data;
            delete user.password;
            result = { status: 'ok', data: user };
        } else {
            result = { status: 'error', error: dataBaseStatus.error, messageKey: dataBaseStatus.messageKey };
        }
        return result;
    }

}
