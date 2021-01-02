import { IRegistrateUser, RegistrateUser } from "../userUseCases/registrateUser";
import { IUserDataBasePresenter, UserDataBasePresenter } from "../DAL/userDataBasePresenter";
import { RoomDataBasePresenter, IRoomDataBasePresenter } from "../DAL/roomDataBasePresenter";
import { IRoomUseCases, RoomUseCases } from "../roomUseCases";
import { DataBaseLocal } from "../DAL/dataBaseLocal";
import { IWebSocket, WebsocketIO } from "../websocket";
import { IFindUser, FindUser } from "../userUseCases/findUsers";
import { DataBaseFile } from "../DAL/dataBaseFile";
import { AuthorizationUser, IAuthorizationUser } from "../userUseCases/authorizationUser";

export interface IAppContext {
    roomDataBasePresenter: IRoomDataBasePresenter;
    userDataBasePresenter: IUserDataBasePresenter;
    websocketIO: IWebSocket;
    registrateUser: IRegistrateUser;
    authorizationUser:IAuthorizationUser;
    findUser: IFindUser
    roomUseCases: IRoomUseCases;
};

export class AppContext implements IAppContext {
    private dataBase = new DataBaseFile();
    // private dataBase = new DataBaseLocal();
    readonly roomDataBasePresenter: IRoomDataBasePresenter = new RoomDataBasePresenter(this.dataBase);
    readonly userDataBasePresenter: IUserDataBasePresenter = new UserDataBasePresenter(this.dataBase);

    readonly websocketIO = new WebsocketIO();
    // users
    readonly registrateUser = new RegistrateUser(this.userDataBasePresenter);
    readonly authorizationUser = new AuthorizationUser(this.userDataBasePresenter);
    readonly findUser = new FindUser(this.userDataBasePresenter);
    // rooms
    readonly roomUseCases = new RoomUseCases(this.roomDataBasePresenter);
};