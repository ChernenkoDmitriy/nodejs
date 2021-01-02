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
;
class UserDataBasePresenter {
    constructor(dataBase) {
        this.dataBase = dataBase;
        this.getUserById = (userUid) => __awaiter(this, void 0, void 0, function* () {
        });
        this.findUsers = (findBy, value) => __awaiter(this, void 0, void 0, function* () {
            try {
                let result = [];
                const lowerCaseValue = value.toLowerCase();
                if (findBy === 'email' || findBy === 'phone' || findBy === 'name') {
                    const users = yield this.dataBase.getUsers();
                    console.log('users ', users);
                    result = yield users.filter(user => user[findBy].toLowerCase().match(lowerCaseValue));
                }
                return result;
            }
            catch (error) {
                console.warn('DataBasePresenter -> userRegistration: ', error);
                return [];
            }
        });
        this.userRegistration = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const isAdded = yield this.dataBase.userRegistration(user);
                return isAdded;
            }
            catch (error) {
                console.warn('DataBasePresenter -> userRegistration: ', error);
                return false;
            }
        });
        this.userAuthorization = (email, hashPassword) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.dataBase.getUsers();
                const user = users.find(item => (item.email === email && item.hashPassword === hashPassword));
                return user;
            }
            catch (error) {
                console.warn('DataBasePresenter -> userAuthorization: ', error);
            }
        });
    }
    ;
}
exports.UserDataBasePresenter = UserDataBasePresenter;
;
//# sourceMappingURL=userDataBasePresenter.js.map