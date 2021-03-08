import { DataBaseFile } from "../../../DAL/dataBaseFile";
import { IDataBase } from "../../../DAL/IDataBase";
import { IUserRegisterDataBase, UserRegisterDataBase } from "../dataBase/UserRegisterDataBase";
import { IUserRegisterRoute, UserRegisterRoute } from "../route/UserRegisterRoute";
import { IUserRegisterUseCase, UserRegisterUseCase } from "../useCases/UserRegisterUseCase";

export interface IUserRegisterFactory {
    userRegisterRoute: IUserRegisterRoute;
}

export class UserRegisterFactory implements IUserRegisterFactory {
    private dataBase: IDataBase = new DataBaseFile();
    private userRegisterDataBase: IUserRegisterDataBase = new UserRegisterDataBase(this.dataBase);
    private userRegisterUseCase: IUserRegisterUseCase = new UserRegisterUseCase(this.userRegisterDataBase);
    readonly userRegisterRoute: IUserRegisterRoute = new UserRegisterRoute(this.userRegisterUseCase);
}
