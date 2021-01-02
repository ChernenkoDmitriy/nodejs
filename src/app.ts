import { AppContext } from "./context";
import express from 'express';
import http from 'http';
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const { websocketIO, registrateUser,authorizationUser, roomUseCases, findUser } = new AppContext();

app.use(registrateUser.routeName, registrateUser.validator, registrateUser.registration);
app.use(authorizationUser.routeName, authorizationUser.validator, authorizationUser.authorization);
app.use(findUser.routeName, findUser.validator, findUser.findUsers);
app.use(roomUseCases.addMemberToRoomRoute, roomUseCases.addMemberToRoomValidator, roomUseCases.addMemberToRoom);
app.use(roomUseCases.createRoomRoute, roomUseCases.createRoomValidator, roomUseCases.createRoom);
app.use(roomUseCases.removeMemberFromRoomRoute, roomUseCases.removeMemberFromRoomValidator, roomUseCases.removeMemberFromRoom);
app.use(roomUseCases.updateRoomNameRoute, roomUseCases.updateRoomNameValidator, roomUseCases.updateRoomName);

const server = http.createServer(app);

const webSocketIo = socketIO(server);
websocketIO.setSocket(webSocketIo);

server.listen(PORT, () => { console.log(`Server has been started...${PORT}`) });
