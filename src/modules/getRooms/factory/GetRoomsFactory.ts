
import { DataBaseFile } from "../../../DAL/dataBaseFile";
import { IDataBase } from "../../../DAL/IDataBase";
import { IRoomDataBase } from "../../../DAL/RoomDataBase/IRoomDataBase";
import { RoomDataBase } from "../../../DAL/RoomDataBase/RoomDataBase";
import { IGetRoomsRoute, GetRoomsRoute } from "../route/GetRoomsRoute";
import { IGetRoomsUseCase, GetRoomsUseCase } from "../useCases/GetRoomsUseCase";

export interface IGetRoomsFactory {
    getRoomsRoute: IGetRoomsRoute;
}

export class GetRoomsFactory implements IGetRoomsFactory {
    private dataBase: IDataBase = new DataBaseFile();
    private roomDataBase: IRoomDataBase = new RoomDataBase(this.dataBase);
    private getRoomsUseCase: IGetRoomsUseCase = new GetRoomsUseCase(this.roomDataBase);
    readonly getRoomsRoute: IGetRoomsRoute = new GetRoomsRoute(this.getRoomsUseCase);
}
