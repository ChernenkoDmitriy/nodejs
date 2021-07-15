import { FirebaseMessaging } from "../../../messaging/FirebaseMessaging";
import { SocketIOWrapper } from "../../../socketIO";
import { NotificationPersistance } from "../../notification/DAL/NotificationPersistance";
import { RoomHelper } from "../api/RoomHelper";
import { RoomMessageHelper } from "../api/RoomMessageHelper";
import { RoomController } from "../controller/RoomController";
import { RoomDataBase } from "../DAL/RoomDataBase";
import { CreateRoomUseCase } from "../useCases/createRoom/CreatRoomUseCase";
import { GetUserRoomsUseCase } from "../useCases/getUserRooms/GetUserRoomsUseCase";
const RoomModel = require('../../../DAL/models/roomModule');
const FcmTokenModules = require('../../../DAL/models/fcmTokenModules');

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
        const messaging = new FirebaseMessaging();
        const roomDataBase = new RoomDataBase(RoomModel);
        const roomHelper = new RoomHelper();
        const notificationPersistance = new NotificationPersistance(FcmTokenModules);

        const createRoomUseCase = new CreateRoomUseCase(roomHelper, roomDataBase, messaging, notificationPersistance);
        const getUserRoomsUseCase = new GetUserRoomsUseCase(roomHelper, roomDataBase);

        const userController = new RoomController(createRoomUseCase, getUserRoomsUseCase);
        return userController;
    }

}
