import { Router } from 'express';
import { RoomFactory } from '../factory/RoomFactory';
import { body } from 'express-validator'

const ROUTE_NAMES = {
    CREATE_ROOM: '/create-room',
    GET_USER_ROOMS: '/get-user-rooms',
}

const roomRouter = Router();
const roomController = RoomFactory.get();

roomRouter.post(
    ROUTE_NAMES.CREATE_ROOM,
    body('name', 'wrong_name').isString(),
    body('members', 'wrong_members').isArray({ min: 1 }),
    body('admin', 'wrong_admin').isString(),
    roomController.createRoom
);
roomRouter.post(
    ROUTE_NAMES.GET_USER_ROOMS,
    body('userId', 'wrong_id').isLength({ min: 1 }),
    roomController.getUserRooms
);

export default roomRouter;