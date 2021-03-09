
import { DataBaseFile } from "../../../DAL/dataBaseFile";
import { IDataBase } from "../../../DAL/IDataBase";
import { IRoomDataBase } from "../../../DAL/RoomDataBase/IRoomDataBase";
import { RoomDataBase } from "../../../DAL/RoomDataBase/RoomDataBase";
import { IGetRoomRoute, GetRoomRoute } from "../route/GetRoomRoute";
import { IGetRoomUseCase, GetRoomUseCase } from "../useCases/GetRoomUseCase";

export interface IGetRoomFactory {
    getRoomRoute: IGetRoomRoute;
}

export class GetRoomFactory implements IGetRoomFactory {
    private dataBase: IDataBase = new DataBaseFile();
    private roomDataBase: IRoomDataBase = new RoomDataBase(this.dataBase);
    private getRoomUseCase: IGetRoomUseCase = new GetRoomUseCase(this.roomDataBase);
    readonly getRoomRoute: IGetRoomRoute = new GetRoomRoute(this.getRoomUseCase);
}
