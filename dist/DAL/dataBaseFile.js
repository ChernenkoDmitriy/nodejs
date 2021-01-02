"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const USERS_PATH = './src/DAL/data/users.json';
;
class DataBaseFile {
    constructor() {
        this.rooms = [];
        // private users: IUser[] = [];
        this.writeToFile = (fileName, value) => __awaiter(this, void 0, void 0, function* () {
            try {
                const jsonValue = JSON.stringify(value);
                yield fs_1.default.writeFile(fileName, jsonValue, (e) => { console.warn('DataBaseFile -> writeToFile -> error ', e); });
            }
            catch (error) {
                console.warn('DataBaseFile -> writeToFile: ', error);
            }
        });
        this.readFile = (fileName) => __awaiter(this, void 0, void 0, function* () {
            try {
                const promise = new Promise((resolve, reject) => {
                    fs_1.default.readFile(fileName, (error, data) => error ? reject(error) : resolve(data));
                });
                const jsonValue = yield promise.then((jsonValue) => jsonValue).catch(error => console.warn('DataBaseFile -> readFile: ', error));
                return jsonValue ? JSON.parse(jsonValue) : [];
            }
            catch (error) {
                console.warn('DataBaseFile -> readFile: ', error);
                return [];
            }
        });
        this.getUsers = () => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.readFile(USERS_PATH);
            return users;
        });
        this.userRegistration = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.readFile(USERS_PATH);
                if (users.find(item => item.email === user.email)) {
                    return false;
                }
                else {
                    users.push(user);
                    yield this.writeToFile(USERS_PATH, users);
                    return true;
                }
            }
            catch (error) {
                console.warn('DataBaseLocal -> userRegistration: ', error);
                return false;
            }
        });
        // Start rooms
        this.getRooms = () => __awaiter(this, void 0, void 0, function* () {
            return this.rooms;
        });
        this.setRooms = (rooms) => __awaiter(this, void 0, void 0, function* () {
            this.rooms = rooms;
        });
        this.createRoom = (room) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.rooms.push(room);
                return true;
            }
            catch (error) {
                console.warn('DataBaseLocal -> createRoom: ', error);
                return false;
            }
        });
        this.addMemberToRoom = (roomUid, memberUid) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.readFile(USERS_PATH);
                const user = users.find(user => user.uid === memberUid);
                if (user) {
                    for (let index = 0; index < this.rooms.length; index++) {
                        if (this.rooms[index].uid === roomUid) {
                            if (this.rooms[index].members.includes(memberUid)) {
                                return false;
                            }
                            else {
                                this.rooms[index].members.push(memberUid);
                                return true;
                            }
                        }
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.warn('DataBaseLocal -> addMemberToRoom: ', error);
                return false;
            }
        });
    }
}
exports.DataBaseFile = DataBaseFile;
;
//# sourceMappingURL=dataBaseFile.js.map