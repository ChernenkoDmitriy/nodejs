import { Router } from 'express';
import { UserAuthenticationFactory } from '../factory/UserAuthenticationFactory';
const { body } = require('express-validator');

const ROUTE_NAMES = {
    REGISTRATION: '/registration',
    AUTHORIZATION: '/authorization',
    REFRESH_TOKEN: '/refresh-token',
    ACTIVATE_LINK: '/activate/:link',
}

const userRouter = Router();
const userController = UserAuthenticationFactory.get();

userRouter.post(
    ROUTE_NAMES.REGISTRATION,
    body('email', 'wrong_email').isEmail(),
    body('name', 'wrong_name').isLength({ min: 1 }),
    body('password', 'min_pass_length_6').isLength({ min: 1 }),
    userController.registration
);
userRouter.post(
    ROUTE_NAMES.AUTHORIZATION,
    body('email', 'wrong_email').isEmail(),
    body('password', 'min_pass_length_6').isLength({ min: 1 }),
    userController.authorization
);

export default userRouter;