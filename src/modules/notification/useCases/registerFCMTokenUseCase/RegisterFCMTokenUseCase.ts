import { IResponse } from "../../../../types/IResponse";
import { INotificationPersistance } from "../../DAL/NotificationPersistance";

export interface IRegisterFCMTokenUseCase {
    registerFCMToken: (body: { token: string, userId: string, language: string }) => Promise<IResponse>;
}

export class RegisterFCMTokenUseCase implements IRegisterFCMTokenUseCase {
    constructor(
        private notificationPersistance: INotificationPersistance,
    ) { }

    registerFCMToken = async ({ token, userId, language }) => {
        try {
            let result = { status: 'ok' };
            const existToken = await this.notificationPersistance.getFCMTokenByToken(token);
            const isUserIdDifferent = existToken?.userId !== userId;
            if (!!existToken && isUserIdDifferent) {
                const tokenDb = await this.notificationPersistance.updateFCMToken(token, userId, language);
                result = !!tokenDb ? { status: 'ok' } : { status: 'error' };
            } else {
                const tokenDb = await this.notificationPersistance.saveFCMToken(token, userId, language);
                result = !!tokenDb ? { status: 'ok' } : { status: 'error' };
            }
            return result;
        } catch (error) {
            console.warn('RegisterFCMTokenUseCase -> registerFCMToken: ', error);
            const message = error && error.message ? error.message : '';
            return { status: 'error', error: error, message };
        }
    }

}
