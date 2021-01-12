import { IRegistrateUser, RegistrateUser } from "../userUseCases/registration";
import { IUserDataBasePresenter, UserDataBasePresenter } from "../DAL/userDataBasePresenter";
import { RoomDataBasePresenter, IRoomDataBasePresenter } from "../DAL/roomDataBasePresenter";
import { IRoomUseCases, RoomUseCases } from "../roomUseCases";
import { IWebSocket, WebsocketIO } from "../websocket";
import { IFindUser, FindUser } from "../userUseCases/findUsers";
import { DataBaseFile } from "../DAL/dataBaseFile";
import { AuthorizationUser, IAuthorizationUser } from "../userUseCases/authorizationUser";
import { CreateRoom, ICreateRoom } from "../roomUseCases/createRoom";
import { ITeamRadarDataBasePresenter, TeamRadarDataBasePresenter } from "../DAL/teamRadarDataBasePresenter";
import { CreateTeamRadar, ICreateTeamRadar } from "../teamRadarUseCases/createTeamRadar";
import { IGetTeamRadar, GetTeamRadar } from "../teamRadarUseCases/getRadarByRoomUid";
import { GetRooms, IGetRooms } from "../roomUseCases/getRooms";
import { GetRoom, IGetRoom } from "../roomUseCases/getRoom";
import { ITeamRadarManager, TeamRadarManager } from "../teamRadar";
import { CloseTeamRadarVoting, ICloseTeamRadarVoting } from "../teamRadarUseCases/closeRadarVoting";
import { CreateVoting, ICreateVoting } from "../teamRadarUseCases/createVoting";
import { GetRadarByUid, IGetRadarByUid } from "../teamRadarUseCases/getRadarByUid";
import { IVoteRadar, VoteRadar } from "../teamRadarUseCases/voteRadar";
import { Logger } from "../logger";
import { IUserManager, UserManager } from "../user";
import { EdditUser, IEdditUser } from "../userUseCases/edditUser";

export interface IAppContext {
    roomDataBasePresenter: IRoomDataBasePresenter;
    teamRadarDataBasePresenter: ITeamRadarDataBasePresenter;
    websocketIO: IWebSocket;
    // user
    registrateUser: IRegistrateUser;
    authorizationUser: IAuthorizationUser;
    findUser: IFindUser;
    edditUser: IEdditUser;
    // room
    createRoom: ICreateRoom;
    getRooms: IGetRooms;
    getRoom: IGetRoom;
    roomUseCases: IRoomUseCases;
    createTeamRadar: ICreateTeamRadar;
    getTeamRadar: IGetTeamRadar;
    closeTeamRadarVoting: ICloseTeamRadarVoting;
    createVoting: ICreateVoting;
    getRadarByUid: IGetRadarByUid;
    voteRadar: IVoteRadar;
};

export class AppContext implements IAppContext {
    private logger = new Logger();

    private dataBase = new DataBaseFile();
    // private dataBase = new DataBaseLocal();
    readonly roomDataBasePresenter: IRoomDataBasePresenter = new RoomDataBasePresenter(this.dataBase);
    readonly teamRadarDataBasePresenter: ITeamRadarDataBasePresenter = new TeamRadarDataBasePresenter(this.dataBase);

    readonly websocketIO = new WebsocketIO();
    // users
    private userDataBasePresenter: IUserDataBasePresenter = new UserDataBasePresenter(this.dataBase);
    private userManager: IUserManager = new UserManager(this.userDataBasePresenter, this.logger);
    readonly registrateUser = new RegistrateUser(this.userManager);
    readonly authorizationUser = new AuthorizationUser(this.userManager);
    readonly findUser = new FindUser(this.userManager);
    readonly edditUser = new EdditUser(this.userManager);
    // rooms
    readonly createRoom = new CreateRoom(this.roomDataBasePresenter);
    readonly getRooms = new GetRooms(this.roomDataBasePresenter);
    readonly roomUseCases = new RoomUseCases(this.roomDataBasePresenter);
    readonly getRoom = new GetRoom(this.roomDataBasePresenter);
    // radar
    private teamRadarManager: ITeamRadarManager = new TeamRadarManager(this.teamRadarDataBasePresenter, this.logger);
    readonly createTeamRadar = new CreateTeamRadar(this.teamRadarManager);
    readonly getTeamRadar = new GetTeamRadar(this.teamRadarManager);
    readonly closeTeamRadarVoting = new CloseTeamRadarVoting(this.teamRadarManager);
    readonly createVoting = new CreateVoting(this.teamRadarManager);
    readonly getRadarByUid = new GetRadarByUid(this.teamRadarManager);
    readonly voteRadar = new VoteRadar(this.teamRadarManager);
};