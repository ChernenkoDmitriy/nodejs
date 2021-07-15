import { Router } from 'express';
import { UserAuthenticationFactory } from '../factory/UserAuthenticationFactory';
import { body } from 'express-validator'

const ROUTE_NAMES = {
    REGISTRATION: '/registration',
    AUTHORIZATION: '/authorization',
    REFRESH_TOKEN: '/refresh-token',
    ACTIVATE_LINK: '/activate/:link',
    FIND_USERS: '/find-users',
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
userRouter.post(
    ROUTE_NAMES.FIND_USERS,
    body('findBy', 'wrong_findBy').isLength({ min: 4, max: 5 }),
    body('value', 'value_can_not_be_empty').isLength({ min: 1 }),
    userController.findUsers
);

export default userRouter;