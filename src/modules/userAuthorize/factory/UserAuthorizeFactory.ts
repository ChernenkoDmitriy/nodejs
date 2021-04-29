import { DataBaseFile } from "../../../DAL/dataBaseFile";
import { IDataBase } from "../../../DAL/IDataBase";
import { IUserDataBase } from "../../../DAL/UserDataBase/IUserDataBase";
import { UserDataBase } from "../../../DAL/UserDataBase/UserDataBase";
import { IUserAuthorizeRoute, UserAuthorizeRoute } from "../route/UserAuthorizeRoute";
import { IUserAuthorizeUseCase, UserAuthorizeUseCase } from "../useCases/UserAuthorizeUseCase";

export interface IUserAuthorizeFactory {
    userAuthorizeRoute: IUserAuthorizeRoute;
}

export class UserAuthorizeFactory implements IUserAuthorizeFactory {
    private dataBase: IDataBase = new DataBaseFile();
    private userDataBase: IUserDataBase = new UserDataBase(this.dataBase);
    private userAuthorizeUseCase: IUserAuthorizeUseCase = new UserAuthorizeUseCase(this.userDataBase);
    readonly userAuthorizeRoute: IUserAuthorizeRoute = new UserAuthorizeRoute(this.userAuthorizeUseCase);
}
