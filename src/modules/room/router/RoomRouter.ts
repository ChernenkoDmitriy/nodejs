import { Router } from 'express';
import { RoomFactory } from '../factory/RoomFactory';
const { body } = require('express-validator');

const ROUTE_NAMES = {
    GET_USER_ROOMS: '/get-user-rooms',
}

const RoomRouter = Router();
const roomController = RoomFactory.get();

RoomRouter.post(
    ROUTE_NAMES.GET_USER_ROOMS,
    body('userId', 'wrong_id').isLength({ min: 1 }),
    roomController.getUserRooms
);

export default RoomRouter;