import { validateRequest } from '../utils';
import { IUserManager } from '../user';
import { IUser } from '../user/entites';
const { check } = require('express-validator')

export interface IRegistrateUser {
    routeName: string;
    validator: Array<any>;
    registration: (req: any, res: any) => Promise<void>;
};

export class RegistrateUser implements IRegistrateUser {
    readonly routeName = '/registration';
    readonly validator = [
        check('email', 'Wrong email').isEmail(),
        check('phone', 'Wrong phone').isLength({ min: 1 }),
        check('name', 'Wrong name').isLength({ min: 1 }),
        check('hashPassword', 'Minimal password length 6').isLength({ min: 1 }),
    ];

    constructor(private userManager: IUserManager) {

    };

    registration = async (req: any, res: any) => {
        try {
            const { error, message, isError } = validateRequest(req);
            if (isError) {
                return res.status(400).json({ error, message });
            }
            const { email, name, phone, hashPassword } = req.body;
            const user: IUser | null = await this.userManager.registrate(name, phone, email, hashPassword);
            if (user) {
                res.status(200).send({ status: 'ok', message: '', data: user });
            } else {
                res.status(400).send({ status: 'error', message: 'user with such email alredy exist' });
            }
        } catch (error) {
            console.warn('Authentication -> registration: ', error);
            res.status(400).send({ status: 'error', message: 'user is not added', error });
        }
    };

};
