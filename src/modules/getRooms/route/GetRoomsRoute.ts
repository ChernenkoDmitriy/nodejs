import { IGetRoomsUseCase } from "../useCases/GetRoomsUseCase";
const { validationResult } = require('express-validator');
const { check } = require('express-validator')

export interface IGetRoomsRoute {
    routeName: string;
    validator: Array<any>;
    getRoomsByUserUid: (req: any, res: any) => Promise<void>;
}

export class GetRoomsRoute implements IGetRoomsRoute {
    readonly routeName = '/get-user-rooms';
    readonly validator = [
        check('userUid', 'Wrong admin id').isUUID(),
        check('token', 'Wrong token').isUUID(),
    ];

    constructor(private getRoomsUseCase: IGetRoomsUseCase) {

    }

    getRoomsByUserUid = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            const { userUid } = req.body;
            if (isError) {
                return res.status(200).json({ error, message, status: 'error' });
            }
            const rooms = await this.getRoomsUseCase.getRoomsByUserUid(userUid);
            if (rooms) {
                res.status(200).send({ status: 'ok', data: rooms, ok: true });
            } else {
                res.status(200).send({ status: 'error', message: 'not found' });
            }
        } catch (error) {
            console.warn('GetRooms -> getRooms: ', error);
            res.status(400).send({ status: 'error', message: 'not found', error });
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
