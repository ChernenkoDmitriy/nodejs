import { DataBaseFile } from "../../../DAL/dataBaseFile";
import { IDataBase } from "../../../DAL/IDataBase";
import { IUserAuthorizeDataBase, UserAuthorizeDataBase } from "../dataBase/UserAuthorizeDataBase";
import { IUserAuthorizeRoute, UserAuthorizeRoute } from "../route/UserAuthorizeRoute";
import { IUserAuthorizeUseCase, UserAuthorizeUseCase } from "../useCases/UserAuthorizeUseCase";

export interface IUserAuthorizeFactory {
    userAuthorizeRoute: IUserAuthorizeRoute;
}

export class UserAuthorizeFactory implements IUserAuthorizeFactory {
    private dataBase: IDataBase = new DataBaseFile();
    private userAuthorizeDataBase: IUserAuthorizeDataBase = new UserAuthorizeDataBase(this.dataBase);
    private userAuthorizeUseCase: IUserAuthorizeUseCase = new UserAuthorizeUseCase(this.userAuthorizeDataBase);
    readonly userAuthorizeRoute: IUserAuthorizeRoute = new UserAuthorizeRoute(this.userAuthorizeUseCase);
}
