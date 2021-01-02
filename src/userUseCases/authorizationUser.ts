import { IUserDataBasePresenter } from '../DAL/userDataBasePresenter';
const { check, validationResult } = require('express-validator')

export interface IAuthorizationUser {
    routeName: string;
    validator: Array<any>;
    authorization: (req: any, res: any) => Promise<void>;
};

export class AuthorizationUser implements IAuthorizationUser {
    readonly routeName = '/authorization';
    readonly validator = [
        check('email', 'Wrong email').isEmail(),
        check('hashPassword', 'Minimal password length 6').isLength({ min: 1 }),
    ];

    constructor(private dataBase: IUserDataBasePresenter) {

    };

    authorization = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            if (isError) {
                return res.status(400).json({ error, message });
            }
            const { email, hashPassword } = req.body;
            const user = await this.dataBase.userAuthorization(email,hashPassword);
            if (user) {
                res.status(200).send({ status: 'ok', message: 'success', user });
            } else {
                res.status(400).send({ status: 'error', message: 'user is not found' });
            }
        } catch (error) {
            console.warn('Authentication -> registration: ', error);
            res.status(400).send({ status: 'error', message: 'user is not found', error });
        }
    };

    private validateRequest = (req): { error: Array<string>; message: string; isError: boolean; } => {
        const result = { error: [], message: '', isError: false };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            result.error = errors.array();
            result.message = 'Wrong request data';
            result.isError = true;
        }
        return result;
    };

};
