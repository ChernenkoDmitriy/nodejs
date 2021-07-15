import { ICreateRoomUseCase } from "../useCases/createRoom/CreatRoomUseCase";
import { IGetUserRoomsUseCase } from "../useCases/getUserRooms/GetUserRoomsUseCase";
const { validationResult } = require('express-validator');

export class RoomController {
    constructor(
        private createRoomUseCase: ICreateRoomUseCase,
        private getUserRoomsUseCase: IGetUserRoomsUseCase,
    ) { }

    createRoom = async (req: any, res: any) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array(), messageKey: 'not_valid', status: 'error' });
            }
            const data = await this.createRoomUseCase.createRoom(req.body);
            if (data && data.status === 'ok') {
                res.status(200).send(data);
            } else {
                res.status(400).send(data);
            }
        } catch (error) {
            res.status(500).send({ messageKey: 'Server error', error, status: 'error' });
        }
    }

    getUserRooms = async (req: any, res: any) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array(), messageKey: 'not_valid', status: 'error' });
            }
            const data = await this.getUserRoomsUseCase.getUserRooms(req.body);
            if (data && data.status === 'ok') {
                res.status(200).send(data);
            } else {
                res.status(400).send(data);
            }
        } catch (error) {
            res.status(500).send({ messageKey: 'Server error', error, status: 'error' });
        }
    }

}
