import { ICreateRoomRoute } from "../modules/createRoom/route/CreateRoomRoute";
import { IFindUsersRoute } from "../modules/findUsers/route/FindUsersRoute";
import { IUserAuthorizeRoute } from "../modules/userAuthorize/route/UserAuthorizeRoute";
import { IUserRegisterRoute } from "../modules/userRegister/route/UserRegisterRoute";

export interface IAppContext {
    userRegisterRoute: IUserRegisterRoute;
    userAuthorizeRoute: IUserAuthorizeRoute;
    findUserFactory: IFindUsersRoute;
    createRoomRoute: ICreateRoomRoute;
}
