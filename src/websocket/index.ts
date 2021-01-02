// import { Server } from "socket.io";

// type ISocket = Server;
type ISocket = any;

export interface IWebSocket {
    setSocket: (ws: ISocket) => void;
};

export class WebsocketIO implements IWebSocket {
    private ws: ISocket;
    private connections = [];

    setSocket = (ws: ISocket) => {
        this.ws = ws;
        this.createConnection();
    };

    createConnection = () => {
        this.ws.sockets.on('connection', (socket) => {
            console.log('Connected !!!!')
            this.connections.push(socket);

            socket.on('disconnect', (data) => {
                this.connections.splice(this.connections.indexOf(socket), 1);
                console.log('Disconnected !!!!')
            })
        });
    };

};
