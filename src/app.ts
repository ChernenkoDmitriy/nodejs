import express from 'express';
import http from 'http';
import { SocketIOWrapper } from './socketIO';
import cookieParser from 'cookie-parser';
import userRouter from './modules/user/router/Router';
import { config } from './config';
import mongoose from 'mongoose';
import roomRouter from './modules/room/router/RoomRouter';
import notificationRouter from './modules/notification/router/NotificationRouter';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));``
app.use(userRouter);
app.use(roomRouter);
app.use(notificationRouter);

const server = http.createServer(app);

const start = async () => {
    try {
        await mongoose.connect(config.mongodb_link, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const socket = new SocketIOWrapper();
        socket.setServer(server);
        server.listen(PORT, () => { console.log(`Server has been started...${PORT}`) });
    } catch (error) {
        console.log(error);
    }
}

start();