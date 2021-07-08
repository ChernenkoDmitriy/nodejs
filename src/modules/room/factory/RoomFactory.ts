import { SocketIOWrapper } from "../../../socketIO";
import { RoomHelper } from "../api/RoomHelper";
import { RoomController } from "../controller/RoomController";
import { RoomDataBase } from "../DAL/RoomDataBase";
import { CreateRoomUseCase } from "../useCases/createRoom/CreatRoomUseCase";
import { GetUserRoomsUseCase } from "../useCases/getUserRooms/GetUserRoomsUseCase";
const RoomModel = require('../../../DAL/models/roomModule');

export interface ITeamRoomFactory {
    // readonly routeName: string;
    // readonly validator: any[];
    // readonly request: (req: any, res: any) => Promise<void>;
}

export class RoomFactory {
    private static presenter: RoomController;

    static get() {
        if (!RoomFactory.presenter) {
            RoomFactory.presenter = new RoomFactory().createPresenter();
        }
        return RoomFactory.presenter;
    }

    private createPresenter = () => {
        const socket = new SocketIOWrapper();
        const roomDataBase = new RoomDataBase(RoomModel);
        const roomHelper = new RoomHelper();

        new CreateRoomUseCase(roomHelper, roomDataBase, socket);
        const getUserRoomsUseCase = new GetUserRoomsUseCase(roomHelper, roomDataBase);

        const userController = new RoomController(getUserRoomsUseCase);
        return userController;
    }

}
