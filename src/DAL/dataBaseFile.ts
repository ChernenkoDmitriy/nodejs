import fs from 'fs';
import { IUser } from "../user/entites";
import { IRoom } from "../roomUseCases/entities";
import { ITeamRadar } from '../teamRadar/entites';

const USERS_PATH = './src/DAL/data/users.json';
const ROOMS_PATH = './src/DAL/data/rooms.json';

export interface IDataBase {
    getRooms: () => Promise<IRoom[]>;
    setRooms: (rooms: IRoom[]) => Promise<void>;
    createRoom: (room: IRoom) => Promise<IRoom | null>;
    addMemberToRoom: (roomUid: string, memberUid: string) => Promise<boolean>;

    writeToFile: (fileName: string, value: any) => Promise<void>;
    readFile: (fileName: string) => Promise<any[] | null>;
};

export class DataBaseFile implements IDataBase {

    writeToFile = async (fileName: string, value: any): Promise<void> => {
        try {
            const jsonValue = JSON.stringify(value);
            await fs.writeFile(fileName, jsonValue, (e) => { e && console.warn('DataBaseFile -> writeToFile -> error ', e) });
        } catch (error) {
            console.warn('DataBaseFile -> writeToFile: ', error);
        }
    };

    readFile = async (fileName: string): Promise<any[]> => {
        try {
            const promise = new Promise((resolve, reject) => {
                fs.readFile(fileName, (error, data) => error ? reject(error) : resolve(data));
            });
            const jsonValue = await promise.then((jsonValue: string) => jsonValue).catch(error => console.warn('DataBaseFile -> readFile: ', error));
            return jsonValue ? JSON.parse(jsonValue) : [];
        } catch (error) {
            console.warn('DataBaseFile -> readFile: ', error);
            return [];
        }
    };

    // Start rooms

    createRoom = async (room: IRoom): Promise<IRoom | null> => {
        try {
            const rooms: IRoom[] = await this.readFile(ROOMS_PATH);
            rooms.push(room);
            await this.writeToFile(ROOMS_PATH, rooms);
            return room;
        } catch (error) {
            console.warn('DataBaseFile -> createRoom: ', error);
            return null;
        }
    };

    getRooms = async () => {
        try {
            const rooms = await this.readFile(ROOMS_PATH);
            return rooms;
        } catch (error) {
            console.warn('DataBaseFile -> getRooms: ', error);
            return null;
        }
    };

    setRooms = async (rooms: IRoom[]) => {
        try {
            await this.readFile(ROOMS_PATH);
        } catch (error) {
            console.warn('DataBaseFile -> setRooms: ', error);
        }
    };

    addMemberToRoom = async (roomUid: string, memberUid: string) => {
        try {
            const users = await this.readFile(USERS_PATH);
            const rooms = await this.readFile(ROOMS_PATH);
            const user = users.find(user => user.uid === memberUid);
            if (user) {
                for (let index = 0; index < rooms.length; index++) {
                    if (rooms[index].uid === roomUid) {
                        if (rooms[index].members.includes(memberUid)) {
                            return false;
                        } else {
                            rooms[index].members.push(memberUid);
                            return true;
                        }
                    }
                }
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.warn('DataBaseFile -> addMemberToRoom: ', error);
            return false;
        }
    };

    // Start teamRadar



};