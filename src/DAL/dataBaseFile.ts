import fs from 'fs';
import { IUser } from "../userUseCases/entites";
import { IRoom } from "../roomUseCases/entities";

const USERS_PATH = './src/DAL/data/users.json';

export interface IDataBase {
    getUsers: () => Promise<IUser[]>;
    userRegistration: (user: IUser) => Promise<boolean>;

    getRooms: () => Promise<IRoom[]>;
    setRooms: (rooms: IRoom[]) => Promise<void>;
    createRoom: (room: IRoom) => Promise<boolean>;
    addMemberToRoom: (roomUid: string, memberUid: string) => Promise<boolean>;
};

export class DataBaseFile implements IDataBase {
    private rooms: IRoom[] = [];
    // private users: IUser[] = [];

    private writeToFile = async (fileName: string, value: any): Promise<void> => {
        try {
            const jsonValue = JSON.stringify(value);
            await fs.writeFile(fileName, jsonValue, (e) => { console.warn('DataBaseFile -> writeToFile -> error ', e) });
        } catch (error) {
            console.warn('DataBaseFile -> writeToFile: ', error);
        }
    };

    private readFile = async (fileName: string): Promise<any[]> => {
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

    getUsers = async () => {
        const users = await this.readFile(USERS_PATH);
        return users;
    };

    userRegistration = async (user: IUser) => {
        try {
            const users: IUser[] = await this.readFile(USERS_PATH);
            if (users.find(item => item.email === user.email)) {
                return false;
            } else {
                users.push(user);
                await this.writeToFile(USERS_PATH, users)
                return true;
            }
        } catch (error) {
            console.warn('DataBaseLocal -> userRegistration: ', error);
            return false;
        }
    };

    // Start rooms

    getRooms = async () => {
        return this.rooms;
    };

    setRooms = async (rooms: IRoom[]) => {
        this.rooms = rooms;
    };

    createRoom = async (room: IRoom) => {
        try {
            this.rooms.push(room);
            return true;
        } catch (error) {
            console.warn('DataBaseLocal -> createRoom: ', error);
            return false;
        }
    };

    addMemberToRoom = async (roomUid: string, memberUid: string) => {
        try {
            const users = await this.readFile(USERS_PATH);
            const user = users.find(user => user.uid === memberUid);
            if (user) {
                for (let index = 0; index < this.rooms.length; index++) {
                    if (this.rooms[index].uid === roomUid) {
                        if (this.rooms[index].members.includes(memberUid)) {
                            return false;
                        } else {
                            this.rooms[index].members.push(memberUid);
                            return true;
                        }
                    }
                }
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.warn('DataBaseLocal -> addMemberToRoom: ', error);
            return false;
        }
    };

};