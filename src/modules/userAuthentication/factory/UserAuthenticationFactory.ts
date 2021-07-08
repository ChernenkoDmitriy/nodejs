import { DataBaseFile } from "../../../DAL/dataBaseFile";
import { IDataBase } from "../../../DAL/IDataBase";
import { UserPersistance } from "../DAL/userPersistance";
import { UserHelper } from "../api/UserHelper";
import { UserAuthorizationUseCase } from "../useCases/userAuthorizationUseCase/userAuthorizationUseCase";
import { UserRegisterUseCase } from "../useCases/userRegisterUseCase/UserRegisterUseCase";
import { TokenHelper } from "../api/TokenHelper";
import { RegistrationMailHelper } from "../api/RegistrationMailHelper";
import { TokenPersistance } from "../DAL/TokenPersistance";
import { UserController } from "../controller/UserController";
const UserModel = require('../../../DAL/models/userModule');
const TokenModel = require('../../../DAL/models/tokenModule');

export class UserAuthenticationFactory {
    private static presenter: UserController;

    static get() {
        if (!UserAuthenticationFactory.presenter) {
            UserAuthenticationFactory.presenter = new UserAuthenticationFactory().createPresenter();
        }
        return UserAuthenticationFactory.presenter;
    }

    private createPresenter = () => {
        const userPersistance = new UserPersistance(UserModel);
        const tokenPersistance = new TokenPersistance(TokenModel);
        const tokenHelper = new TokenHelper(tokenPersistance);
        const userHelper = new UserHelper();
        const registrationMailHelper = new RegistrationMailHelper();

        const userAuthorizationUseCase = new UserAuthorizationUseCase(userHelper, userPersistance, tokenHelper);
        const userRegisterUseCase = new UserRegisterUseCase(userHelper, userPersistance, registrationMailHelper, tokenHelper);
        const userController = new UserController(userRegisterUseCase, userAuthorizationUseCase);

        return userController;
    }

}
