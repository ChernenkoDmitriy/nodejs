"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("./context");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socketIO = require('socket.io');
const PORT = process.env.PORT || 3000;
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const { websocketIO, registrateUser, authorizationUser, roomUseCases, findUser } = new context_1.AppContext();
app.use(registrateUser.routeName, registrateUser.validator, registrateUser.registration);
app.use(authorizationUser.routeName, authorizationUser.validator, authorizationUser.authorization);
app.use(findUser.routeName, findUser.validator, findUser.findUsers);
app.use(roomUseCases.addMemberToRoomRoute, roomUseCases.addMemberToRoomValidator, roomUseCases.addMemberToRoom);
app.use(roomUseCases.createRoomRoute, roomUseCases.createRoomValidator, roomUseCases.createRoom);
app.use(roomUseCases.removeMemberFromRoomRoute, roomUseCases.removeMemberFromRoomValidator, roomUseCases.removeMemberFromRoom);
app.use(roomUseCases.updateRoomNameRoute, roomUseCases.updateRoomNameValidator, roomUseCases.updateRoomName);
const server = http_1.default.createServer(app);
const webSocketIo = socketIO(server);
websocketIO.setSocket(webSocketIo);
server.listen(PORT, () => { console.log(`Server has been started...${PORT}`); });
//# sourceMappingURL=app.js.map