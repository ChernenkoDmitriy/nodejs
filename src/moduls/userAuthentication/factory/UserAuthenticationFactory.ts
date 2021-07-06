import { DataBaseFile } from "../../../DAL/dataBaseFile";
import { IDataBase } from "../../../DAL/IDataBase";
import { RequestValidator } from "../../../router/RequestValidator";
import { ROUTE_CHECKERS } from "../../../router/RouteCheckers";
import { ROUTE_NAMES } from "../../../router/RouteNames";
import { UserPersistance } from "../DAL/userPersistance";
import { UserHelper } from "../api/UserHelper";
import { UserAuthorizationUseCase } from "../useCases/userAuthorizationUseCase/userAuthorizationUseCase";
import { UserRegisterUseCase } from "../useCases/userRegisterUseCase/UserRegisterUseCase";
import { TokenHelper } from "../api/TokenHelper";
import { RegistrationMailHelper } from "../api/RegistrationMailHelper";
import { TokenPersistance } from "../DAL/TokenPersistance";
import { UserController } from "../controller/UserController";

type IRoute = {
    readonly routeName: string;
    readonly validator: any[];
    readonly request: (req: any, res: any) => Promise<void>;
}

export class UserAuthenticationFactory {
    private static presenter: UserController;

    static get() {
        if (!UserAuthenticationFactory.presenter) {
            UserAuthenticationFactory.presenter = new UserAuthenticationFactory().createPresenter();
        }
        return UserAuthenticationFactory.presenter;
    }

    private createPresenter = () => {
        const dataBase: IDataBase = new DataBaseFile();
        const userPersistance = new UserPersistance(dataBase);
        const tokenPersistance = new TokenPersistance(dataBase);
        const tokenHelper = new TokenHelper(tokenPersistance);
        const userHelper = new UserHelper();
        const registrationMailHelper = new RegistrationMailHelper();

        const userAuthorizationUseCase = new UserAuthorizationUseCase(userHelper, userPersistance);
        const userRegisterUseCase = new UserRegisterUseCase(userHelper, userPersistance, registrationMailHelper, tokenHelper);
        const userController = new UserController(userRegisterUseCase, userAuthorizationUseCase);

        return userController;
    }

}
