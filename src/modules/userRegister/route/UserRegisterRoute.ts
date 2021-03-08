import { IUser } from "../../../models/IUser";
import { IUserRegisterUseCase } from "../useCases/UserRegisterUseCase";
const { validationResult } = require('express-validator');
const { check } = require('express-validator')

export interface IUserRegisterRoute {
    routeName: string;
    validator: Array<any>;
    registration: (req: any, res: any) => Promise<void>;
}

export class UserRegisterRoute implements IUserRegisterRoute {
    readonly routeName = '/registration';
    readonly validator = [
        check('email', 'Wrong email').isEmail(),
        check('phone', 'Wrong phone').isLength({ min: 1 }),
        check('name', 'Wrong name').isLength({ min: 1 }),
        check('hashPassword', 'Minimal password length 6').isLength({ min: 1 }),
    ];

    constructor(private userRegisterUseCase: IUserRegisterUseCase) {

    }

    registration = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            if (isError) {
                return res.status(200).json({ error, message });
            }
            const { email, name, phone, hashPassword } = req.body;
            const user: IUser | null = await this.userRegisterUseCase.register(name, phone, email, hashPassword);
            if (user) {
                res.status(200).send({ message: '', data: user, ok: true });
            } else {
                res.status(200).send({ message: 'User with such email or phone already exist', ok: false });
            }
        } catch (error) {
            console.warn('Authentication -> registration: ', error);
            res.status(400).send({ message: 'User is not added', error });
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
