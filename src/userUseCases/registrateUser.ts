import { IUserDataBasePresenter } from '../DAL/userDataBasePresenter';
import { v4 as uuidv4 } from 'uuid';
const { check, validationResult } = require('express-validator')

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

    constructor(private dataBase: IUserDataBasePresenter) {

    };

    registration = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            if (isError) {
                return res.status(400).json({ error, message });
            }
            const { email, name, phone, hashPassword } = req.body;
            const user = { email, name, phone, hashPassword, createdAt: Date.now(), id: Date.now(), uid: uuidv4() };
            const isAdded = await this.dataBase.userRegistration(user);
            if (isAdded) {
                res.status(200).send({ status: 'ok', message: 'success', user });
            } else {
                res.status(400).send({ status: 'error', message: 'user with such email alredy exist' });
            }
        } catch (error) {
            console.warn('Authentication -> registration: ', error);
            res.status(400).send({ status: 'error', message: 'user is not added', error });
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
