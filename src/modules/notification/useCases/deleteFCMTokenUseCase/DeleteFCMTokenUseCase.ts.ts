import { IResponse } from "../../../../types/IResponse";
import { INotificationPersistance } from "../../DAL/NotificationPersistance";

export interface IDeleteFCMTokenUseCase {
    deleteFCMToken: (body: { token: string }) => Promise<IResponse>;
}

export class DeleteFCMTokenUseCase implements IDeleteFCMTokenUseCase {
    constructor(
        private notificationPersistance: INotificationPersistance,
    ) { }

    deleteFCMToken = async ({ token }) => {
        try {
            const isDeleted = await this.notificationPersistance.deleteFCMToken(token);
            let result = !!isDeleted ? { status: 'ok' } : { status: 'error' }
            return result;
        } catch (error) {
            console.warn('RegisterFCMTokenUseCase -> deleteFCMToken: ', error);
            const message = error && error.message ? error.message : '';
            return { status: 'error', error: error, message };
        }
    }

}
