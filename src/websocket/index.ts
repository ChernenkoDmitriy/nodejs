// import { Server } from "socket.io";

import { IRoomDataBasePresenter } from "../DAL/roomDataBasePresenter";
import { IUserDataBasePresenter } from "../DAL/userDataBasePresenter";

// type ISocket = Server;
type ISocket = any;

export interface IWebSocket {
    setSocket: (ws: ISocket) => void;
};

export class WebsocketIO implements IWebSocket {
    constructor(
        private userDataBase: IUserDataBasePresenter,
        private roomDataBase: IRoomDataBasePresenter,
    ) {

    };

    private ws: ISocket;
    private connections = [];

    setSocket = (ws: ISocket) => {
        this.ws = ws;
        this.createConnection();
    };

    createConnection = () => {
        this.ws.sockets.on('connection', (socket) => {
            console.log('Connected !!!! ', socket)
            this.connections.push(socket);

            socket.on('disconnect', (data) => {
                this.connections.splice(this.connections.indexOf(socket), 1);
                console.log('Disconnected !!!!')
            })
        });
    };

    private checkIsUserExist = async (uid: string, token: string) => {
        try {
            const user = await this.userDataBase.findtUserByUid(uid, token);
            return !!user;
        } catch (error) {
            console.warn('WebsocketIO -> checkIsUserExist: ', error);
            return false;
        }
    };

    private onUpdateRoom = async (uid: string, token: string) => {
        try {
            const rooms = await this.roomDataBase.getUserRooms(uid);
            rooms.forEach(room => {
                room.members.forEach(member => {
                    if (this.connections.includes(member.uid)) {
                        this.ws.send('update room', { uid, isOnline: true })
                    }
                })
            });
            rooms[0].members[0].uid;
        } catch (error) {

        }
    };

};
