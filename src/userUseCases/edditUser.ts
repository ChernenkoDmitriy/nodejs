import { IUserDataBasePresenter } from '../DAL/userDataBasePresenter';
import { IUserManager } from '../user';
import { validateRequest } from '../utils';
const { check, validationResult } = require('express-validator')

export interface IEdditUser {
    routeName: string;
    validator: Array<any>;
    eddit: (req: any, res: any) => Promise<void>;
};

export class EdditUser implements IEdditUser {
    readonly routeName = '/eddit-user';
    readonly validator = [
        check('uid', 'Wrong uid').isUUID(),
        check('token', 'Wrong token').isUUID(),
    ];

    constructor(private userManager: IUserManager) {

    };

    eddit = async (req: any, res: any) => {
        try {
            const { error, message, isError } = validateRequest(req);
            if (isError) {
                return res.status(400).json({ error, message });
            }
            const { uid, token, data } = req.body;
            const user = await this.userManager.edditUser(uid, token, data );
            if (user) {
                res.status(200).send({ status: 'ok', message: '', data: user });
            } else {
                res.status(400).send({ status: 'error', message: 'user is not found' });
            }
        } catch (error) {
            console.warn('Authentication -> registration: ', error);
            res.status(400).send({ status: 'error', message: 'user is not found', error });
        }
    };

};
