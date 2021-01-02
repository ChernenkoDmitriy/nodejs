"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
;
class RoomDataBasePresenter {
    constructor(dataBase) {
        this.dataBase = dataBase;
        this.createRoom = (room) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.dataBase.createRoom(room);
                return true;
            }
            catch (error) {
                console.warn('DataBasePresenter -> userAuthorization: ', error);
                return false;
            }
        });
        this.addMemberToRoom = (roomUid, memberUid) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.dataBase.addMemberToRoom(roomUid, memberUid);
                return true;
            }
            catch (error) {
                console.warn('DataBasePresenter -> addMemberToRoom: ', error);
                return false;
            }
        });
        this.removeMemberFromRoom = (roomUid, memberUid) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rooms = yield this.dataBase.getRooms();
                for (const i in rooms) {
                    if (rooms[i].uid == roomUid) {
                        rooms[i].members = rooms[i].members.filter(item => item !== memberUid);
                        break;
                    }
                }
                this.dataBase.setRooms(rooms);
                return true;
            }
            catch (error) {
                console.warn('DataBasePresenter -> removeMemberToRoom: ', error);
                return false;
            }
        });
        this.updateRoomName = (roomUid, memberUid, name) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rooms = yield this.dataBase.getRooms();
                for (const i in rooms) {
                    if (rooms[i].uid == roomUid && rooms[i].members.includes(memberUid)) {
                        rooms[i].name = name;
                        break;
                    }
                }
                this.dataBase.setRooms(rooms);
                return true;
            }
            catch (error) {
                console.warn('DataBasePresenter -> updateRoomName: ', error);
                return false;
            }
        });
        this.getRoomByUid = (roomUid) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rooms = yield this.dataBase.getRooms();
                const room = rooms.find(item => item.uid === roomUid);
                return room;
            }
            catch (error) {
                console.warn('DataBasePresenter -> getRoomByUid: ', error);
                return undefined;
            }
        });
    }
    ;
}
exports.RoomDataBasePresenter = RoomDataBasePresenter;
;
//# sourceMappingURL=roomDataBasePresenter.js.map