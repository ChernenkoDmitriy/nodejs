import { ISendToMany, IAddListenerSocket } from "./index";
const socketIO = require('socket.io');

export interface ISocket extends ISendToMany, IAddListenerSocket {
    setServer: (ws: ISocket) => void;
};

export class SocketIOWrapper implements ISocket {
    private static instance: SocketIOWrapper;

    private ws: any;
    private connections: { [key: string]: { id: string, socket: any } } = {} as any;
    private useCases = {};

    constructor() {
        if (!SocketIOWrapper.instance) {
            SocketIOWrapper.instance = this;
        }
        return SocketIOWrapper.instance;
    }

    setServer = (server: any) => {
        const webSocketIo = socketIO(server);
        this.ws = webSocketIo;
        this.createConnection();
    }

    private createConnection = () => {
        this.ws.sockets.on('connection', async (socket) => {
            console.log('connect')
            const { id, token } = socket.handshake.query;
            this.connections[token] = { socket, id };

            Object.keys(this.useCases).forEach(socketEvent => {
                socket.on(socketEvent, (msg) => {
                    this.useCases[socketEvent](msg)
                })
            })

            socket.on('disconnect', (data) => {
                console.log('disconnect ', data);
                delete this.connections[token];
            });
        });
    }

    addListener = (event: string, callBack: (msg: any) => void) => {
        this.useCases[event] = callBack;
    }

    sendToMany = (userUids: string[], event: string, data: any) => {
        Object.values(this.connections).forEach(item => {
            if (userUids.includes(item.id)) {
                item.socket.emit(event, data);
            }
        });
    }

}
