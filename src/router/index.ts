import { UserAuthenticationFactory } from "../moduls/userAuthentication/factory/UserAuthenticationFactory";
import { Router } from 'express';
import { ROUTE_NAMES } from "./RouteNames";

// const CHECKERS = {
//     email: check('email', 'wrong_email').isEmail(),
//     phone: check('phone', 'wrong_phone').isLength({ min: 1 }),
//     name: check('name', 'wrong_name').isLength({ min: 1 }),
//     password: check('password', 'min_pass_length_6').isLength({ min: 1 }),
// };

export const router = Router();

export class RouterCreator {
    static readonly userController = UserAuthenticationFactory.get();
}

router.post(ROUTE_NAMES.REGISTRATION, RouterCreator.userController.registration);
router.post(ROUTE_NAMES.AUTHORIZATION);
router.get(ROUTE_NAMES.REFRESH_TOKEN);
router.get(ROUTE_NAMES.ACTIVATE_LINK);
