import { DataBaseFile } from "../../../DAL/dataBaseFile";
import { IDataBase } from "../../../DAL/IDataBase";
import { IRoomDataBase } from "../../../DAL/RoomDataBase/IRoomDataBase";
import { RoomDataBase } from "../../../DAL/RoomDataBase/RoomDataBase";
import { ICreateRoomRoute, CreateRoomRoute } from "../route/CreateRoomRoute";
import { ICreateRoomUseCase, CreateRoomUseCase } from "../useCases/CreateRoomUseCase";

export interface ICreateRoomFactory {
    createRoomRoute: ICreateRoomRoute;
}

export class CreateRoomFactory implements ICreateRoomFactory {
    private dataBase: IDataBase = new DataBaseFile();
    private createRoomDataBase: IRoomDataBase = new RoomDataBase(this.dataBase);
    private createRoomUseCase: ICreateRoomUseCase = new CreateRoomUseCase(this.createRoomDataBase);
    readonly createRoomRoute: ICreateRoomRoute = new CreateRoomRoute(this.createRoomUseCase);
}
