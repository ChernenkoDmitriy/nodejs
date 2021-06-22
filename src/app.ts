import express from 'express';
import http from 'http';
import { WebsocketIO } from './socketIO';
import { RouterCreator } from "./router";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
    registration,
    authorization,
} = RouterCreator;

app.use(registration.routeName, registration.validator, registration.request);
app.use(authorization.routeName, authorization.validator, authorization.request);

const server = http.createServer(app);

const start = async () => {
    try {
        const socket = new WebsocketIO();
        socket.setServer(server);
        server.listen(PORT, () => { console.log(`Server has been started...${PORT}`) });
    } catch (error) {
        console.log(error);
    }
}

start();