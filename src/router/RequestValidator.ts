import { IResponse } from "../types/IResponse";
const { validationResult, check } = require('express-validator');

const CHECKERS = {
    email: check('email', 'Wrong email').isEmail(),
    phone: check('phone', 'Wrong phone').isLength({ min: 1 }),
    name: check('name', 'Wrong name').isLength({ min: 1 }),
    password: check('password', 'Minimal password length 6').isLength({ min: 1 }),
};

export class RequestValidator {
    constructor(
        readonly routeName: string,
        readonly validateStrings: any[],
        private useCase: (body: any) => Promise<IResponse>,
        private isNeedToken?: boolean) {
    }

    get validator() {
        let result = [];
        if (Array.isArray(this.validateStrings) && this.validateStrings.length) {
            result = this.validateStrings.map(item => CHECKERS[item])
        }
        return result;
    }

    request = async (req: any, res: any) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array(), message: 'Not valid', status: 'error' });
            }
            const data = await this.useCase(req.body);
            if (data && data.status === 'ok') {
                res.status(200).send(data);
            } else {
                res.status(400).send(data);
            }
        } catch (error) {
            console.warn('Authentication -> registration: ', error);
            res.status(500).send({ message: 'Server error', error });
        }
    }

}