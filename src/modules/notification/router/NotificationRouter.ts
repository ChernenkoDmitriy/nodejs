
import { Router } from 'express';
import { NotificationFactory } from '../factory/NotificationFactory';
import { body } from 'express-validator'

const ROUTE_NAMES = {
    REGISTER_FCM_TOKEN: '/register-fcm-token',
    UPDATE_FCM_TOKEN: '/update-fcm-token',
    DELETE_FCM_TOKEN: '/delete-fcm-token',
}

const notificationRouter = Router();
const notificationController = NotificationFactory.get();

notificationRouter.post(
    ROUTE_NAMES.REGISTER_FCM_TOKEN,
    body('token', 'wrong_token').isString(),
    body('userId', 'wrong_userId').isString(),
    body('language', 'wrong_language').isString(),
    notificationController.registerFCMToken
);
notificationRouter.post(
    ROUTE_NAMES.UPDATE_FCM_TOKEN,
    body('token', 'wrong_token').isString(),
    body('userId', 'wrong_userId').isString(),
    body('language', 'wrong_language').isString(),
    notificationController.updateFCMToken
);
notificationRouter.post(
    ROUTE_NAMES.DELETE_FCM_TOKEN,
    body('token', 'wrong_token').isString(),
    notificationController.deleteFCMToken
);

export default notificationRouter;
