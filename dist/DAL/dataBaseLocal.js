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
class DataBaseLocal {
    constructor() {
        this.rooms = [];
        this.users = usersMock;
        // private users: IUser[] = [];
        this.getUsers = () => __awaiter(this, void 0, void 0, function* () {
            return this.users;
        });
        this.userRegistration = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.users.push(user);
                console.log('users ', this.users);
                return true;
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
                console.log('rooms ', this.rooms);
                return true;
            }
            catch (error) {
                console.warn('DataBaseLocal -> createRoom: ', error);
                return false;
            }
        });
        this.addMemberToRoom = (roomUid, memberUid) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = this.users.find(user => user.uid === memberUid);
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
                    console.log('rooms ', this.rooms);
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
exports.DataBaseLocal = DataBaseLocal;
;
const usersMock = [
    {
        email: 'test@test.ua',
        name: 'test',
        phone: '123456789',
        hashPassword: 'hashPassword',
        createdAt: 1605766574667,
        id: 1605766574667,
        uid: '88477532-8faf-4589-b79c-7d7e1ed09847'
    },
    {
        email: 'test@test.ua',
        name: 'test1',
        phone: '123456789',
        hashPassword: 'hashPassword',
        createdAt: 1605766592161,
        id: 1605766592161,
        uid: 'a77dbf26-1d26-488f-9dbe-88d4e0333355'
    },
    {
        email: 'test@test.ua',
        name: 'test12',
        phone: '123456789',
        hashPassword: 'hashPassword',
        createdAt: 1605766594549,
        id: 1605766594549,
        uid: '052814cf-d94f-4b6d-8ff9-34fb3752f944'
    },
    {
        email: 'test@test.ua',
        name: 'test123',
        phone: '123456789',
        hashPassword: 'hashPassword',
        createdAt: 1605766597010,
        id: 1605766597010,
        uid: 'a8e0a038-4e51-403a-98f5-48a0a98d7c56'
    },
    {
        email: 'test@test.ua',
        name: 'vasay',
        phone: '123456789',
        hashPassword: 'hashPassword',
        createdAt: 1605766604664,
        id: 1605766604664,
        uid: '11a0bba2-374e-4741-a171-317fac2460d3'
    },
    {
        email: 'test@test.ua',
        name: 'Olay',
        phone: '123456789',
        hashPassword: 'hashPassword',
        createdAt: 1605766608701,
        id: 1605766608701,
        uid: '53d0382e-a357-482b-bc36-6a2876571918'
    },
    {
        email: 'test@test.ua',
        name: 'Petay',
        phone: '123456789',
        hashPassword: 'hashPassword',
        createdAt: 1605766612798,
        id: 1605766612798,
        uid: '1212c7e1-44ec-4aab-87b1-0291dcc59d6e'
    },
    {
        email: 'test@test.ua',
        name: 'Lolo',
        phone: '123456789',
        hashPassword: 'hashPassword',
        createdAt: 1605766616354,
        id: 1605766616354,
        uid: 'b7bb0403-4d89-4b4b-a1e7-e134f8e63666'
    },
    {
        email: 'test@test.ua',
        name: 'Hatea',
        phone: '123456789',
        hashPassword: 'hashPassword',
        createdAt: 1605766622190,
        id: 1605766622190,
        uid: '75d8e4c5-ef53-4a6c-be14-b6264e868619'
    }
];
//# sourceMappingURL=dataBaseLocal.js.map