import { IFindUsersUseCase } from "../useCases/FindUsersUseCase";

const { validationResult } = require('express-validator');
const { check } = require('express-validator')

export interface IFindUsersRoute {
    routeName: string;
    validator: Array<any>;
    findUsers: (req: any, res: any) => Promise<void>;
};

export class FindUsersRoute implements IFindUsersRoute {
    readonly routeName = '/find-users';
    readonly validator = [
        check('value', 'Wrong value').isLength({ min: 1 }),
        check('token', 'Wrong value').isUUID(),
    ];

    constructor(private findUsersUseCase: IFindUsersUseCase) {

    }

    findUsers = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            if (isError) {
                return res.status(400).json({ error, message });
            }
            const { value, token } = req.body;
            const users = await this.findUsersUseCase.findUsers(value, token);
            if (Array.isArray(users)) {
                res.status(200).send({ ok: true, message: '', data: users });
            } else {
                res.status(200).send({ ok: false, message: 'Users are not found' });
            }
        } catch (error) {
            console.warn('Authentication -> registration: ', error);
            res.status(400).send({ status: 'error', message: 'users are not found', error });
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
