import { AppContext } from "./context/AppContext";
import express from 'express';
import http from 'http';
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
    userRegisterRoute,
    userAuthorizeRoute,
    findUserFactory,
    createRoomRoute,
} = new AppContext();

app.use(userRegisterRoute.routeName, userRegisterRoute.validator, userRegisterRoute.registration);
app.use(userAuthorizeRoute.routeName, userAuthorizeRoute.validator, userAuthorizeRoute.authorization);
app.use(findUserFactory.routeName, findUserFactory.validator, findUserFactory.findUsers);
app.use(createRoomRoute.routeName, createRoomRoute.validator, createRoomRoute.createRoom);

// app.use(edditUser.routeName, edditUser.validator, edditUser.eddit);

// app.use(getRooms.routeName, getRooms.validator, getRooms.getRooms);
// app.use(getRoom.routeName, getRoom.validator, getRoom.getRoom);

// app.use(roomUseCases.addMemberToRoomRoute, roomUseCases.addMemberToRoomValidator, roomUseCases.addMemberToRoom);
// app.use(roomUseCases.removeMemberFromRoomRoute, roomUseCases.removeMemberFromRoomValidator, roomUseCases.removeMemberFromRoom);
// app.use(roomUseCases.updateRoomNameRoute, roomUseCases.updateRoomNameValidator, roomUseCases.updateRoomName);

// app.use(createTeamRadar.routeName, createTeamRadar.validator, createTeamRadar.createTeamRadar);
// app.use(getTeamRadar.routeName, getTeamRadar.validator, getTeamRadar.getTeamRadar);
// app.use(closeTeamRadarVoting.routeName, closeTeamRadarVoting.validator, closeTeamRadarVoting.closeTeamRadarVoting);
// app.use(createVoting.routeName, createVoting.validator, createVoting.createVoting);
// app.use(getRadarByUid.routeName, getRadarByUid.validator, getRadarByUid.getRadarByUid);
// app.use(voteRadar.routeName, voteRadar.validator, voteRadar.voteRadar);

const server = http.createServer(app);

// const webSocketIo = socketIO(server);
// websocketIO.setSocket(webSocketIo);

server.listen(PORT, () => { console.log(`Server has been started...${PORT}`) });
