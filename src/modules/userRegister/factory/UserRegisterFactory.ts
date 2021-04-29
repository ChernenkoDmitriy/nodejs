import { DataBaseFile } from "../../../DAL/dataBaseFile";
import { IDataBase } from "../../../DAL/IDataBase";
import { IUserDataBase } from "../../../DAL/UserDataBase/IUserDataBase";
import { UserDataBase } from "../../../DAL/UserDataBase/UserDataBase";
import { IUserRegisterRoute, UserRegisterRoute } from "../route/UserRegisterRoute";
import { IUserRegisterUseCase, UserRegisterUseCase } from "../useCases/UserRegisterUseCase";

export interface IUserRegisterFactory {
    userRegisterRoute: IUserRegisterRoute;
}

export class UserRegisterFactory implements IUserRegisterFactory {
    private dataBase: IDataBase = new DataBaseFile();
    private userDataBase: IUserDataBase = new UserDataBase(this.dataBase);
    private userRegisterUseCase: IUserRegisterUseCase = new UserRegisterUseCase(this.userDataBase);
    readonly userRegisterRoute: IUserRegisterRoute = new UserRegisterRoute(this.userRegisterUseCase);
}
