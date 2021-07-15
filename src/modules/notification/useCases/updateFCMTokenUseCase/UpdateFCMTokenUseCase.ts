import { IResponse } from "../../../../types/IResponse";
import { INotificationPersistance } from "../../DAL/NotificationPersistance";

export interface IUpdateFCMTokenUseCase {
    updateFCMToken: (body: { token: string, userId: string, language: string }) => Promise<IResponse>;
}

export class UpdateFCMTokenUseCase implements IUpdateFCMTokenUseCase {
    constructor(
        private notificationPersistance: INotificationPersistance,
    ) { }

    updateFCMToken = async ({ token, userId, language }) => {
        try {
            const tokenDb = await this.notificationPersistance.updateFCMToken(token, userId, language);
            let result = !!tokenDb ? { status: 'ok' } : { status: 'error' }
            return result;
        } catch (error) {
            console.warn('RegisterFCMTokenUseCase -> updateFCMToken: ', error);
            const message = error && error.message ? error.message : '';
            return { status: 'error', error: error, message };
        }
    }

}
