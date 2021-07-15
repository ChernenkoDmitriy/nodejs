import { IFCMToken } from "../types/IFCMToken";
import { Types } from 'mongoose';
import { IDataBase } from "../../../DAL/IDataBase";

export interface INotificationPersistance {
    getFCMTokensByUsersId: (usersId: string[]) => Promise<IFCMToken[]>;
    saveFCMToken: (token: string, userId: string, language: string) => Promise<IFCMToken>;
    updateFCMToken: (token: string, userId: string, language: string) => Promise<IFCMToken>;
    getFCMTokenByToken: (token: string) => Promise<IFCMToken | null>;
    deleteFCMToken: (token: string) => Promise<boolean>;
}

export class NotificationPersistance implements INotificationPersistance {
    constructor(private dataBase: IDataBase<IFCMToken>) {

    }

    getFCMTokensByUsersId = async (usersId: string[]) => {
        try {
            const ids = usersId.map(id => Types.ObjectId(id));
            const tokens: IFCMToken[] = await this.dataBase.find({ 'userId': { $in: ids } });
            return tokens;
        } catch (error) {
            console.warn('NotificationDataBase -> getFCMTokensByUserId: ', error);
            return [];
        }
    }

    getFCMTokenByToken = async (token: string) => {
        try {
            const tokenDb: IFCMToken = await this.dataBase.findOne({ 'token': token });
            return tokenDb;
        } catch (error) {
            console.warn('NotificationDataBase -> getFCMTokensByUserId: ', error);
            return null;
        }
    }

    deleteFCMToken = async (token: string) => {
        try {
            const tokenDb = await this.dataBase.deleteOne({ token });
            return true;
        } catch (error) {
            console.warn('NotificationDataBase -> getUserRooms: ', error);
            return false;
        }
    }

    updateFCMToken = async (token: string, userId: string, language: string) => {
        try {
            const tokenDb = await this.dataBase.updateOne({ token: token }, { token, userId, language });
            return tokenDb;
        } catch (error) {
            console.warn('NotificationDataBase -> updateFCMToken: ', error);
        }
    }

    saveFCMToken = async (token: string, userId: string, language: string) => {
        try {
            const tokenDb = await this.dataBase.create({ token, userId, language });
            return tokenDb;
        } catch (error) {
            console.warn('NotificationDataBase -> saveFCMToken: ', error);
        }
    }

}
