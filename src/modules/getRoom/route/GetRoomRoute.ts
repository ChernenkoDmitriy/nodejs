
import { IGetRoomUseCase } from "../useCases/GetRoomUseCase";

const { validationResult } = require('express-validator');
const { check } = require('express-validator')

export interface IGetRoomRoute {
    routeName: string;
    validator: Array<any>;
    getRoomByUid: (req: any, res: any) => Promise<void>;
}

export class GetRoomRoute implements IGetRoomRoute {
    readonly routeName = '/get-room';
    readonly validator = [
        check('roomUid', 'Wrong admin id').isUUID(),
        check('token', 'Wrong token').isUUID(),
    ];

    constructor(private getRoomUseCase: IGetRoomUseCase) {

    }

    getRoomByUid = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            const { roomUid } = req.body;
            if (isError) {
                return res.status(200).json({ error, message, status: 'error' });
            }
            const room = await this.getRoomUseCase.getRoomByUid(roomUid);
            if (room) {
                res.status(200).send({ message: '', data: room, ok: true });
            } else {
                res.status(200).send({ status: 'error', message: 'room is not found' });
            }
        } catch (error) {
            console.warn('GetRoom -> getRoom: ', error);
            res.status(400).send({ status: 'error', message: 'room is not found', error });
        }
    }

    validateRequest = (req): { error: Array<string>; message: string; isError: boolean; } => {
        const result = { error: [], message: '', isError: false };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            result.error = errors.array();
            result.message = 'Wrong request data';
            result.isError = true;
        }
        return result;
    }

}
