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
const { check, validationResult } = require('express-validator');
;
class FindUser {
    constructor(dataBase) {
        this.dataBase = dataBase;
        this.routeName = '/find-users';
        this.validator = [
            check('findBy', 'Find by name, email or phone').isLength({ min: 4, max: 5 }),
            check('value', 'Wrong value').isLength({ min: 1 }),
        ];
        this.findUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, message, isError } = this.validateRequest(req);
                if (isError) {
                    return res.status(400).json({ error, message });
                }
                const { findBy, value } = req.body;
                const data = yield this.dataBase.findUsers(findBy, value);
                if (Array.isArray(data)) {
                    res.status(200).send({ status: 'ok', message: 'success', data });
                }
                else {
                    res.status(400).send({ status: 'error', message: 'users is not found' });
                }
            }
            catch (error) {
                console.warn('Authentication -> registration: ', error);
                res.status(400).send({ status: 'error', message: 'users is not found', error });
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
exports.FindUser = FindUser;
;
//# sourceMappingURL=findUsers.js.map