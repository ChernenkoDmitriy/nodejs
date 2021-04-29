import { DataBaseFile } from "../../../DAL/dataBaseFile";
import { IDataBase } from "../../../DAL/IDataBase";
import { IUserDataBase } from "../../../DAL/UserDataBase/IUserDataBase";
import { UserDataBase } from "../../../DAL/UserDataBase/UserDataBase";
import { IFindUsersRoute, FindUsersRoute } from "../route/FindUsersRoute";
import { IFindUsersUseCase, FindUsersUseCase } from "../useCases/FindUsersUseCase";


export interface IFindUserFactory {
    findUsersRoute: IFindUsersRoute;
}

export class FindUserFactory implements IFindUserFactory {
    private dataBase: IDataBase = new DataBaseFile();
    private userDataBase: IUserDataBase = new UserDataBase(this.dataBase);
    private findUsersUseCase: IFindUsersUseCase = new FindUsersUseCase(this.userDataBase);
    readonly findUsersRoute: IFindUsersRoute = new FindUsersRoute(this.findUsersUseCase);
}
