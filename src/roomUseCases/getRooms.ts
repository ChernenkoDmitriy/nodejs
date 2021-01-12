import { IRoomDataBasePresenter } from '../DAL/roomDataBasePresenter';
const { check, validationResult } = require('express-validator')

export interface IGetRooms {
    routeName: string;
    validator: Array<any>;
    getRooms: (req: any, res: any) => Promise<void>;
};

export class GetRooms implements IGetRooms {
    readonly routeName = '/get-user-rooms';
    readonly validator = [
        check('uid', 'Wrong uid').isUUID(),
    ];

    constructor(private dataBase: IRoomDataBasePresenter) {

    };

    getRooms = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            if (isError) {
                return res.status(400).json({ error, message, status: 'error' });
            }
            const { uid } = req.body;
            const rooms = await this.dataBase.getUserRooms(uid);
            if (rooms) {
                res.status(200).send({ status: 'ok', message: 'success', data: rooms });
            } else {
                res.status(400).send({ status: 'error', message: 'rooms is not found' });
            }
        } catch (error) {
            console.warn('GetRooms -> getRooms: ', error);
            res.status(400).send({ status: 'error', message: 'rooms is not found', error });
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
