
import { NotificationPersistance } from "../DAL/NotificationPersistance";
import { NotificationController } from "../controller/NotificationController";
import { RegisterFCMTokenUseCase } from "../useCases/registerFCMTokenUseCase/RegisterFCMTokenUseCase";
import { UpdateFCMTokenUseCase } from "../useCases/updateFCMTokenUseCase/UpdateFCMTokenUseCase";
import { DeleteFCMTokenUseCase } from "../useCases/deleteFCMTokenUseCase/DeleteFCMTokenUseCase.ts";
const FcmTokenModules = require('../../../DAL/models/fcmTokenModules');

export class NotificationFactory {
    private static presenter: NotificationController;

    static get() {
        if (!NotificationFactory.presenter) {
            NotificationFactory.presenter = new NotificationFactory().createPresenter();
        }
        return NotificationFactory.presenter;
    }

    private createPresenter = () => {
        const notificationPersistance = new NotificationPersistance(FcmTokenModules);

        const registerFCMTokenUseCase = new RegisterFCMTokenUseCase(notificationPersistance);
        const updateFCMTokenUseCase = new UpdateFCMTokenUseCase(notificationPersistance);
        const deleteFCMTokenUseCase = new DeleteFCMTokenUseCase(notificationPersistance);

        const notificationController = new NotificationController(registerFCMTokenUseCase, updateFCMTokenUseCase, deleteFCMTokenUseCase);

        return notificationController;
    }
}
