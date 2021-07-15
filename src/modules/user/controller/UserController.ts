import { IFindUsersUseCase } from "../useCases/findUsersUseCase/FindUsersUseCase";
import { IUserAuthorizationUseCase } from "../useCases/userAuthorizationUseCase/userAuthorizationUseCase";
import { IUserRegisterUseCase } from "../useCases/userRegisterUseCase/UserRegisterUseCase";
const { validationResult } = require('express-validator');

export class UserController {
    constructor(
        private userRegisterUseCase: IUserRegisterUseCase,
        private userAuthorizationUseCase: IUserAuthorizationUseCase,
        private findUsersUseCase: IFindUsersUseCase,
    ) { }

    registration = async (req: any, res: any) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array(), messageKey: 'not_valid', status: 'error' });
            }
            const data = await this.userRegisterUseCase.register(req.body);
            if (data && data.status === 'ok') {
                res.status(200).send(data);
            } else {
                res.status(400).send(data);
            }
        } catch (error) {
            res.status(500).send({ messageKey: 'Server error', error, status: 'error' });
        }
    }

    authorization = async (req: any, res: any) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array(), messageKey: 'not_valid', status: 'error' });
            }
            const data = await this.userAuthorizationUseCase.authorize(req.body);
            if (data && data.status === 'ok') {
                res.cookie('refreshToken', data.data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
                res.status(200).send(data);
            } else {
                res.status(400).send(data);
            }
        } catch (error) {
            res.status(500).send({ messageKey: 'Server error', error, status: 'error' });
        }
    }

    findUsers = async (req: any, res: any) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array(), messageKey: 'not_valid', status: 'error' });
            }
            const data = await this.findUsersUseCase.findUsers(req.body);
            if (data && data.status === 'ok') {
                res.cookie('refreshToken', data.data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
                res.status(200).send(data);
            } else {
                res.status(400).send(data);
            }
        } catch (error) {
            res.status(500).send({ messageKey: 'Server error', error, status: 'error' });
        }
    }

}
