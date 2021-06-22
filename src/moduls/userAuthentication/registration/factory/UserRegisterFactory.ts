import { DataBaseFile } from "../../../../DAL/dataBaseFile";
import { IDataBase } from "../../../../DAL/IDataBase";
import { RequestValidator } from "../../../../router/RequestValidator";
import { ROUTE_CHECKERS } from "../../../../router/RouteCheckers";
import { ROUTE_NAMES } from "../../../../router/RouteNames";
import { UserRegistrationHelper } from "../api/UserRegistrationHelper";
import { UserPersistance } from "../../DAL/userPersistance";
import { UserRegisterUseCase } from "../useCases/UserRegisterUseCase/UserRegisterUseCase";

export interface IUserRegisterPresenter {
    readonly routeName: string;
    readonly validator: any[];
    readonly request: (req: any, res: any) => Promise<void>;
}

export class UserRegisterFactory {
    private static presenter: IUserRegisterPresenter;

    static get() {
        if (!UserRegisterFactory.presenter) {
            UserRegisterFactory.presenter = new UserRegisterFactory().createPresenter();
        }
        return UserRegisterFactory.presenter;
    }

    private createPresenter = () => {
        const dataBase: IDataBase = new DataBaseFile();
        const userPersistance = new UserPersistance(dataBase);
        const userRegistrationHelper = new UserRegistrationHelper();
        const userRegisterUseCase = new UserRegisterUseCase(userRegistrationHelper, userPersistance);
        const presenter = new RequestValidator(ROUTE_NAMES.REGISTRATION, ROUTE_CHECKERS.REGISTRATION, userRegisterUseCase.register);
        return presenter;
    }

}
