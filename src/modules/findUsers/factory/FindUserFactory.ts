import { DataBaseFile } from "../../../DAL/dataBaseFile";
import { IDataBase } from "../../../DAL/IDataBase";
import { IFindUsersDataBase, FindUsersDataBase } from "../dataBase/FindUsersDataBase";
import { IFindUsersRoute, FindUsersRoute } from "../route/FindUsersRoute";
import { IFindUsersUseCase, FindUsersUseCase } from "../useCases/FindUsersUseCase";


export interface IFindUserFactory {
    findUsersRoute: IFindUsersRoute;
}

export class FindUserFactory implements IFindUserFactory {
    private dataBase: IDataBase = new DataBaseFile();
    private findUsersDataBase: IFindUsersDataBase = new FindUsersDataBase(this.dataBase);
    private findUsersUseCase: IFindUsersUseCase = new FindUsersUseCase(this.findUsersDataBase);
    readonly findUsersRoute: IFindUsersRoute = new FindUsersRoute(this.findUsersUseCase);
}
