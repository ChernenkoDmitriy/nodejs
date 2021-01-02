"use strict";
// import { Server } from "socket.io";
Object.defineProperty(exports, "__esModule", { value: true });
;
class WebsocketIO {
    constructor() {
        this.connections = [];
        this.setSocket = (ws) => {
            this.ws = ws;
            this.createConnection();
        };
        this.createConnection = () => {
            this.ws.sockets.on('connection', (socket) => {
                console.log('Connected !!!!');
                this.connections.push(socket);
                socket.on('disconnect', (data) => {
                    this.connections.splice(this.connections.indexOf(socket), 1);
                    console.log('Disconnected !!!!');
                });
            });
        };
    }
}
exports.WebsocketIO = WebsocketIO;
;
//# sourceMappingURL=index.js.map