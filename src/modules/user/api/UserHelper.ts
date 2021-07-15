import { IUser } from "../types/IUser";
import { v4 as uuidv4 } from 'uuid';
import { IDatabaseResponse } from "../../../types/IDatabaseResponse";
import { IResponse } from "../../../types/IResponse";
import { IRoomMember } from "../../room/types/IRoomMember";
const bcrypt = require('bcryptjs');

export interface IUserHelper {
    getDtoMembers: (users: IUser[]) => IRoomMember[];
    getDtoUsers: (users: IUser[]) => { email: string, uid: string, name: string, phone: string, logo: string, id: string }[];
    createUser: (name: string, password: string, email: string) => Promise<IUser>;
    getUserForResponse: (dataBaseStatus: IDatabaseResponse) => IResponse;
    getDtoUser: (user: IUser) => { email: string, uid: string, name: string, phone: string, logo: string, id: string };
}

export class UserHelper implements IUserHelper {

    getDtoMembers = (users: IUser[]) => {
        return users.map(user => ({ email: user.email, name: user.name, logo: user.logo, id: user._id }));
    }

    getDtoUsers = (users: IUser[]) => {
        return users.map(user => this.getDtoUser(user));
    }

    getDtoUser = ({ email, uid, name, phone, logo, _id }: IUser) => {
        return { email, uid, name, phone, logo, id: _id };
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
        if (dataBaseStatus) {
            const user = dataBaseStatus.data;
            delete user.password;
            result = { status: 'ok', data: user };
        } else {
            result = { status: 'error', error: dataBaseStatus.error, messageKey: dataBaseStatus.messageKey };
        }
        return result;
    }

}
