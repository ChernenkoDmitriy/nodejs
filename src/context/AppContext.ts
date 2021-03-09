import { CreateRoomFactory } from "../modules/createRoom/factory/CreateRoomFactory";
import { ICreateRoomRoute } from "../modules/createRoom/route/CreateRoomRoute";
import { FindUserFactory } from "../modules/findUsers/factory/FindUserFactory";
import { IFindUsersRoute } from "../modules/findUsers/route/FindUsersRoute";
import { GetRoomFactory } from "../modules/getRoom/factory/GetRoomFactory";
import { IGetRoomRoute } from "../modules/getRoom/route/GetRoomRoute";
import { GetRoomsFactory } from "../modules/getRooms/factory/GetRoomsFactory";
import { IGetRoomsRoute } from "../modules/getRooms/route/GetRoomsRoute";
import { UserAuthorizeFactory } from "../modules/userAuthorize/factory/UserAuthorizeFactory";
import { IUserAuthorizeRoute } from "../modules/userAuthorize/route/UserAuthorizeRoute";
import { UserRegisterFactory } from "../modules/userRegister/factory/UserRegisterFactory";
import { IUserRegisterRoute } from "../modules/userRegister/route/UserRegisterRoute";
import { IAppContext } from "./IAppContext";

export class AppContext implements IAppContext {
    readonly userRegisterRoute: IUserRegisterRoute = new UserRegisterFactory().userRegisterRoute;
    readonly userAuthorizeRoute: IUserAuthorizeRoute = new UserAuthorizeFactory().userAuthorizeRoute
    readonly findUserFactory: IFindUsersRoute = new FindUserFactory().findUsersRoute;
    readonly createRoomRoute: ICreateRoomRoute = new CreateRoomFactory().createRoomRoute;
    readonly getRoomsRoute: IGetRoomsRoute = new GetRoomsFactory().getRoomsRoute;
    readonly getRoomRoute: IGetRoomRoute = new GetRoomFactory().getRoomRoute;
}
