import { v4 as uuidv4 } from 'uuid';
import { IUserDataBasePresenter } from '../DAL/userDataBasePresenter';
import { ILogger } from '../logger';
import { IUser } from './entites';

export interface IUserManager {
    registrate: (name: string, phone: string, email: string, hashPassword: string) => Promise<IUser | null>;
    authorizate: (email: string, hashPassword: string) => Promise<IUser | undefined>;
    edditUser: (uid: string, token: string, { name, phone, email, hashPassword }) => Promise<IUser | null>;
    findUsers: (findBy: 'email' | 'phone' | 'name', value: string, token: string) => Promise<IUser[]>;
};

export class UserManager implements IUserManager {
    constructor(private dataBase: IUserDataBasePresenter, private logger: ILogger) {

    };

    registrate = async (name: string, phone: string, email: string, hashPassword: string): Promise<IUser | null> => {
        try {
            let result = null;
            if (name && phone && email && hashPassword) {
                const user: IUser = { email, name, phone, hashPassword, id: Date.now(), uid: uuidv4(), token: uuidv4() };
                result = await this.dataBase.addUser(user);
            }
            return result;
        } catch (error) {
            this.logger.log('UserManager -> registrate:', JSON.stringify(error));
        }
    };

    authorizate = async (email: string, hashPassword: string): Promise<IUser | undefined> => {
        try {
            let result = undefined;
            if (email && hashPassword) {
                result = await this.dataBase.findUserByEmailAndPassword(email, hashPassword);
            }
            return result;
        } catch (error) {
            this.logger.log('UserManager -> authorizate:', JSON.stringify(error));
        }
    };

    edditUser = async (uid: string, token: string, { name, phone, email, hashPassword }): Promise<IUser | null> => {
        try {
            let result = null;
            const user = await this.dataBase.findtUserByUid(uid, token);
            if (user) {
                if (name && typeof name === 'string') {
                    user.name = name;
                }
                if (phone && typeof phone === 'string') {
                    user.phone = phone;
                }
                if (email && typeof email === 'string') {
                    user.email = email;
                }
                if (hashPassword && typeof hashPassword === 'string') {
                    user.hashPassword = hashPassword;
                }
                result = await this.dataBase.updateUser(user);
            }
            return result;
        } catch (error) {
            this.logger.log('UserManager -> edditUser:', JSON.stringify(error));
            return null;
        }
    };

    findUsers = async (findBy: 'email' | 'phone' | 'name', value: string, token: string): Promise<IUser[]> => {
        try {
            const users = await this.dataBase.findUsers(findBy, value, token);
            return users;
        } catch (error) {
            this.logger.log('UserManager -> findUsers:', JSON.stringify(error));
            return [];
        }
    };

};
