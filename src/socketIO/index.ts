import { SOCKET_EVENTS } from "./socketConstansts";

const socketIO = require('socket.io');

// import { Server } from "socket.io";
// type ISocket = Server;
type ISocket = any;

export interface IWebSocket {
    setServer: (ws: ISocket) => void;
    setUseCase: (event: string, callBack: (msg: any) => void) => void;
    send: (uids: string[], event: string, data: any) => void;
};

export class WebsocketIO implements IWebSocket {
    private static instance: WebsocketIO;

    private ws: ISocket;
    private connections = {};
    private useCases = {};

    constructor() {
        if (!WebsocketIO.instance) {
            WebsocketIO.instance = this;
        }
        return WebsocketIO.instance;
    }

    setServer = (server: any) => {
        const webSocketIo = socketIO(server);
        this.ws = webSocketIo;
        this.createConnection();
    };

    private createConnection = () => {
        this.ws.sockets.on('connection', async (socket) => {
            console.log('connect ', socket);
            const { uid, token } = socket.handshake.query;
            this.connections[uid] = socket;

            Object.keys(this.useCases).forEach(socketEvent => {
                socket.on(socketEvent, (msg) => this.useCases[socketEvent](msg))
            })

            socket.on('disconnect', (data) => {
                console.log('disconnect ', data);
                delete this.connections[uid];
            });
        });
    };

    setUseCase = (event: string, callBack: (msg: any) => void) => {
        this.useCases[event] = callBack;
    }

    send = (uids: string[], event: string, data: any) => {
        uids.forEach(uid => {
            if (this.connections[uid]) {
                this.connections[uid].emit(event, data);
            }
        });
    }

}
