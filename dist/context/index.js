"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registrateUser_1 = require("../userUseCases/registrateUser");
const userDataBasePresenter_1 = require("../DAL/userDataBasePresenter");
const roomDataBasePresenter_1 = require("../DAL/roomDataBasePresenter");
const roomUseCases_1 = require("../roomUseCases");
const websocket_1 = require("../websocket");
const findUsers_1 = require("../userUseCases/findUsers");
const dataBaseFile_1 = require("../DAL/dataBaseFile");
const authorizationUser_1 = require("../userUseCases/authorizationUser");
;
class AppContext {
    constructor() {
        this.dataBase = new dataBaseFile_1.DataBaseFile();
        // private dataBase = new DataBaseLocal();
        this.roomDataBasePresenter = new roomDataBasePresenter_1.RoomDataBasePresenter(this.dataBase);
        this.userDataBasePresenter = new userDataBasePresenter_1.UserDataBasePresenter(this.dataBase);
        this.websocketIO = new websocket_1.WebsocketIO();
        // users
        this.registrateUser = new registrateUser_1.RegistrateUser(this.userDataBasePresenter);
        this.authorizationUser = new authorizationUser_1.AuthorizationUser(this.userDataBasePresenter);
        this.findUser = new findUsers_1.FindUser(this.userDataBasePresenter);
        // rooms
        this.roomUseCases = new roomUseCases_1.RoomUseCases(this.roomDataBasePresenter);
    }
}
exports.AppContext = AppContext;
;
//# sourceMappingURL=index.js.map