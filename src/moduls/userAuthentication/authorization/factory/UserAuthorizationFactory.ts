import { DataBaseFile } from "../../../../DAL/dataBaseFile";
import { IDataBase } from "../../../../DAL/IDataBase";
import { RequestValidator } from "../../../../router/RequestValidator";
import { ROUTE_CHECKERS } from "../../../../router/RouteCheckers";
import { ROUTE_NAMES } from "../../../../router/RouteNames";
import { UserPersistance } from "../../DAL/userPersistance";
import { UserAuthorizationHelper } from "../api/UserAuthorizationHelper";
import { UserAuthorizationUseCase } from "../useCases/userAuthorizationUseCase/userAuthorizationUseCase";

export interface IUserAuthorizationFactory {
    readonly routeName: string;
    readonly validator: any[];
    readonly request: (req: any, res: any) => Promise<void>;
}

export class UserAuthorizationFactory {
    private static presenter: IUserAuthorizationFactory;

    static get() {
        if (!UserAuthorizationFactory.presenter) {
            UserAuthorizationFactory.presenter = new UserAuthorizationFactory().createPresenter();
        }
        return UserAuthorizationFactory.presenter;
    }

    private createPresenter = () => {
        const dataBase: IDataBase = new DataBaseFile();
        const userPersistance = new UserPersistance(dataBase);
        const userRegistrationHelper = new UserAuthorizationHelper();
        const userRegisterUseCase = new UserAuthorizationUseCase(userRegistrationHelper, userPersistance);
        const presenter = new RequestValidator(ROUTE_NAMES.AUTHORIZATION, ROUTE_CHECKERS.AUTHORIZATION, userRegisterUseCase.authorize);
        return presenter;
    }

}
