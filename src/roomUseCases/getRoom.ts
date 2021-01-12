import { IRoomDataBasePresenter } from '../DAL/roomDataBasePresenter';
const { check, validationResult } = require('express-validator')

export interface IGetRoom {
    routeName: string;
    validator: Array<any>;
    getRoom: (req: any, res: any) => Promise<void>;
};

export class GetRoom implements IGetRoom {
    readonly routeName = '/get-room';
    readonly validator = [
        check('roomUid', 'Wrong uid').isUUID(),
    ];

    constructor(private dataBase: IRoomDataBasePresenter) {

    };

    getRoom = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            if (isError) {
                return res.status(400).json({ error, message, status: 'error' });
            }
            const { roomUid } = req.body;
            const room = await this.dataBase.getRoomByUid(roomUid);
            if (room) {
                res.status(200).send({ status: 'ok', message: 'success', data: room });
            } else {
                res.status(400).send({ status: 'error', message: 'room is not found' });
            }
        } catch (error) {
            console.warn('GetRoom -> getRoom: ', error);
            res.status(400).send({ status: 'error', message: 'room is not found', error });
        }
    };

    private validateRequest = (req): { error: Array<string>; message: string; isError: boolean; } => {
        const result = { error: [], message: '', isError: false };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            result.error = errors.array();
            result.message = 'Wrong request data';
            result.isError = true;
        }
        return result;
    };

};
