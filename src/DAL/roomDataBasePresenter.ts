import { IRoom } from "../roomUseCases/entities";
import { IDataBase } from "./dataBaseLocal";

export interface IRoomDataBasePresenter {
    getRoomByUid: (roomUid: string) => Promise<IRoom | undefined>;
    createRoom: (room: IRoom) => Promise<boolean>;
    addMemberToRoom: (roomUid: string, memberUid: string) => Promise<boolean>;
    removeMemberFromRoom: (roomUid: string, memberUid: string) => Promise<boolean>;
    updateRoomName: (roomUid: string, memberUid: string, name: string) => Promise<boolean>;
};

export class RoomDataBasePresenter implements IRoomDataBasePresenter {
    constructor(private dataBase: IDataBase) {

    };

    createRoom = async (room: IRoom) => {
        try {
            this.dataBase.createRoom(room);
            return true;
        } catch (error) {
            console.warn('DataBasePresenter -> userAuthorization: ', error);
            return false;
        }
    };

    addMemberToRoom = async (roomUid: string, memberUid: string) => {
        try {
            this.dataBase.addMemberToRoom(roomUid, memberUid);
            return true;
        } catch (error) {
            console.warn('DataBasePresenter -> addMemberToRoom: ', error);
            return false;
        }
    };

    removeMemberFromRoom = async (roomUid: string, memberUid: string) => {
        try {
            const rooms = await this.dataBase.getRooms();
            for (const i in rooms) {
                if (rooms[i].uid == roomUid) {
                    rooms[i].members = rooms[i].members.filter(item => item !== memberUid);
                    break;
                }
            }
            this.dataBase.setRooms(rooms);
            return true;
        } catch (error) {
            console.warn('DataBasePresenter -> removeMemberToRoom: ', error);
            return false;
        }
    };

    updateRoomName = async (roomUid: string, memberUid: string, name: string) => {
        try {
            const rooms = await this.dataBase.getRooms();
            for (const i in rooms) {
                if (rooms[i].uid == roomUid && rooms[i].members.includes(memberUid)) {
                    rooms[i].name = name;
                    break;
                }
            }
            this.dataBase.setRooms(rooms);
            return true;
        } catch (error) {
            console.warn('DataBasePresenter -> updateRoomName: ', error);
            return false;
        }
    };

    getRoomByUid = async (roomUid: string) => {
        try {
            const rooms = await this.dataBase.getRooms();
            const room = rooms.find(item => item.uid === roomUid);
            return room;
        } catch (error) {
            console.warn('DataBasePresenter -> getRoomByUid: ', error);
            return undefined;
        }
    };

};
