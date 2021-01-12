import { IUserManager } from '../user';
import { validateRequest } from '../utils';
const { check } = require('express-validator')

export interface IFindUser {
    routeName: string;
    validator: Array<any>;
    findUsers: (req: any, res: any) => Promise<void>;
};

export class FindUser implements IFindUser {
    readonly routeName = '/find-users';
    readonly validator = [
        check('findBy', 'Find by name, email or phone').isLength({ min: 4, max: 5 }),
        check('value', 'Wrong value').isLength({ min: 1 }),
        check('token', 'Wrong value').isUUID(),
    ];

    constructor(private userManager: IUserManager) {

    };

    findUsers = async (req: any, res: any) => {
        try {
            const { error, message, isError } = validateRequest(req);
            if (isError) {
                return res.status(400).json({ error, message });
            }
            const { findBy, value, token } = req.body;
            const users = await this.userManager.findUsers(findBy, value, token);
            if (Array.isArray(users)) {
                res.status(200).send({ status: 'ok', message: 'success', data: users });
            } else {
                res.status(400).send({ status: 'error', message: 'users is not found' });
            }
        } catch (error) {
            console.warn('Authentication -> registration: ', error);
            res.status(400).send({ status: 'error', message: 'users is not found', error });
        }
    };

};
