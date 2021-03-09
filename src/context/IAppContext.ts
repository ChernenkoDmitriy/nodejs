import { ICreateRoomRoute } from "../modules/createRoom/route/CreateRoomRoute";
import { IFindUsersRoute } from "../modules/findUsers/route/FindUsersRoute";
import { IGetRoomRoute } from "../modules/getRoom/route/GetRoomRoute";
import { IGetRoomsRoute } from "../modules/getRooms/route/GetRoomsRoute";
import { IUserAuthorizeRoute } from "../modules/userAuthorize/route/UserAuthorizeRoute";
import { IUserRegisterRoute } from "../modules/userRegister/route/UserRegisterRoute";

export interface IAppContext {
    userRegisterRoute: IUserRegisterRoute;
    userAuthorizeRoute: IUserAuthorizeRoute;
    findUserFactory: IFindUsersRoute;
    createRoomRoute: ICreateRoomRoute;
    getRoomsRoute: IGetRoomsRoute;
    getRoomRoute: IGetRoomRoute;
}
