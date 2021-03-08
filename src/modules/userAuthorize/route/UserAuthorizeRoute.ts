import { IUser } from '../../../models/IUser';
import { IUserAuthorizeUseCase } from '../useCases/UserAuthorizeUseCase';
const { validationResult } = require('express-validator');
const { check } = require('express-validator')

export interface IUserAuthorizeRoute {
    routeName: string;
    validator: Array<any>;
    authorization: (req: any, res: any) => Promise<void>;
};

export class UserAuthorizeRoute implements IUserAuthorizeRoute {
    readonly routeName = '/authorization';
    readonly validator = [
        check('email', 'Wrong email').isEmail(),
        check('hashPassword', 'Minimal password length 6').isLength({ min: 1 }),
    ];

    constructor(private userAuthorizeUseCase: IUserAuthorizeUseCase) {

    }

    authorization = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            if (isError) {
                return res.status(200).json({ error, message });
            }
            const { email, hashPassword } = req.body;
            const user: IUser | null = await this.userAuthorizeUseCase.authorize(email, hashPassword);
            if (user) {
                res.status(200).send({ ok: true, message: '', data: user });
            } else {
                res.status(200).send({ ok: false, message: 'User is not found' });
            }
        } catch (error) {
            console.warn('UserAuthorizeRoute -> authorization: ', error);
            res.status(400).send({ ok: false, message: 'user is not found', error });
        }
    }

    validateRequest = (req): { error: Array<string>; message: string; isError: boolean; } => {
        const result = { error: [], message: '', isError: false };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            result.error = errors.array();
            result.message = 'Wrong request data';
            result.isError = true;
        }
        return result;
    }

}
