import express from 'express';
import http from 'http';
import { SocketIOWrapper } from './socketIO';
import cookieParser from 'cookie-parser';
import userRouter from './moduls/userAuthentication/router/Router';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);

const server = http.createServer(app);

const start = async () => {
    try {
        const socket = new SocketIOWrapper();
        socket.setServer(server);
        server.listen(PORT, () => { console.log(`Server has been started...${PORT}`) });
    } catch (error) {
        console.log(error);
    }
}

start();