"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const { check, validationResult } = require('express-validator');
;
class RegistrateUser {
    constructor(dataBase) {
        this.dataBase = dataBase;
        this.routeName = '/registration';
        this.validator = [
            check('email', 'Wrong email').isEmail(),
            check('phone', 'Wrong phone').isLength({ min: 1 }),
            check('name', 'Wrong name').isLength({ min: 1 }),
            check('hashPassword', 'Minimal password length 6').isLength({ min: 1 }),
        ];
        this.registration = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, message, isError } = this.validateRequest(req);
                if (isError) {
                    return res.status(400).json({ error, message });
                }
                const { email, name, phone, hashPassword } = req.body;
                const user = { email, name, phone, hashPassword, createdAt: Date.now(), id: Date.now(), uid: uuid_1.v4() };
                const isAdded = yield this.dataBase.userRegistration(user);
                if (isAdded) {
                    res.status(200).send({ status: 'ok', message: 'success', user });
                }
                else {
                    res.status(400).send({ status: 'error', message: 'user with such email alredy exist' });
                }
            }
            catch (error) {
                console.warn('Authentication -> registration: ', error);
                res.status(400).send({ status: 'error', message: 'user is not added', error });
            }
        });
        this.validateRequest = (req) => {
            const result = { error: [], message: '', isError: false };
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                result.error = errors.array();
                result.message = 'Wrong request data';
                result.isError = true;
            }
            return result;
        };
    }
    ;
}
exports.RegistrateUser = RegistrateUser;
;
//# sourceMappingURL=registrateUser.js.map