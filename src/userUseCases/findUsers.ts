import { IUserDataBasePresenter } from '../DAL/userDataBasePresenter';
import { v4 as uuidv4 } from 'uuid';
const { check, validationResult } = require('express-validator')

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
    ];

    constructor(private dataBase: IUserDataBasePresenter) {

    };

    findUsers = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            if (isError) {
                return res.status(400).json({ error, message });
            }
            const { findBy, value } = req.body;
            const data = await this.dataBase.findUsers(findBy, value);
            if (Array.isArray(data)) {
                res.status(200).send({ status: 'ok', message: 'success', data });
            } else {
                res.status(400).send({ status: 'error', message: 'users is not found' });
            }
        } catch (error) {
            console.warn('Authentication -> registration: ', error);
            res.status(400).send({ status: 'error', message: 'users is not found', error });
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
