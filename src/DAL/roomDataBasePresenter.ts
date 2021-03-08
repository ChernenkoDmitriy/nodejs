// import { IRoom } from "../room/entities";
// import { IDataBase } from "./dataBaseFile";

// const ROOMS_PATH = './src/DAL/data/rooms.json';

// export interface IRoomDataBasePresenter {
//     createRoom: (room: IRoom) => Promise<IRoom | null>;
//     getUserRooms: (uid: string) => Promise<IRoom[] | null>;
//     getRoomByUid: (roomUid: string) => Promise<IRoom | undefined>;

//     addMemberToRoom: (roomUid: string, memberUid: string) => Promise<boolean>;
//     removeMemberFromRoom: (roomUid: string, memberUid: string) => Promise<boolean>;
//     updateRoomName: (roomUid: string, memberUid: string, name: string) => Promise<boolean>;
// };

// export class RoomDataBasePresenter implements IRoomDataBasePresenter {
//     constructor(private dataBase: IDataBase) { };

//     createRoom = async (room: IRoom): Promise<IRoom | null> => {
//         try {
//             const rooms: IRoom[] = await this.dataBase.readFile(ROOMS_PATH);
//             rooms.push(room);
//             await this.dataBase.writeToFile(ROOMS_PATH, rooms);
//             return room;
//         } catch (error) {
//             console.warn('RoomDataBasePresenter -> createRoom: ', error);
//             return null;
//         }
//     };

//     getUserRooms = async (uid: string): Promise<IRoom[] | null> => {
//         try {
//             const rooms: IRoom[] = await this.dataBase.readFile(ROOMS_PATH);
//             const usersRooms = rooms.filter(room => room.members.find(member => member.uid === uid));
//             return usersRooms;
//         } catch (error) {
//             console.warn('RoomDataBasePresenter -> getRooms: ', error);
//             return null;
//         }
//     };

//     getRoomByUid = async (roomUid: string): Promise<IRoom | undefined> => {
//         try {
//             const rooms: IRoom[] = await this.dataBase.readFile(ROOMS_PATH);
//             const room = rooms.find(item => item.uid === roomUid);
//             return room;
//         } catch (error) {
//             console.warn('RoomDataBasePresenter -> getRoomByUid: ', error);
//             return undefined;
//         }
//     };



    
//     addMemberToRoom = async (roomUid: string, memberUid: string) => {
//         try {
//             this.dataBase.addMemberToRoom(roomUid, memberUid);
//             return true;
//         } catch (error) {
//             console.warn('DataBasePresenter -> addMemberToRoom: ', error);
//             return false;
//         }
//     };

//     removeMemberFromRoom = async (roomUid: string, memberUid: string) => {
//         try {
//             // const rooms = await this.dataBase.getRooms();
//             // for (const i in rooms) {
//             //     if (rooms[i].uid == roomUid) {
//             //         rooms[i].members = rooms[i].members.filter(item => item !== memberUid);
//             //         break;
//             //     }
//             // }
//             // this.dataBase.setRooms(rooms);
//             return true;
//         } catch (error) {
//             console.warn('DataBasePresenter -> removeMemberToRoom: ', error);
//             return false;
//         }
//     };

//     updateRoomName = async (roomUid: string, memberUid: string, name: string) => {
//         try {
//             // const rooms = await this.dataBase.getRooms();
//             // for (const i in rooms) {
//             //     if (rooms[i].uid == roomUid && rooms[i].members.includes(memberUid)) {
//             //         rooms[i].name = name;
//             //         break;
//             //     }
//             // }
//             // this.dataBase.setRooms(rooms);
//             return true;
//         } catch (error) {
//             console.warn('DataBasePresenter -> updateRoomName: ', error);
//             return false;
//         }
//     };



// };
