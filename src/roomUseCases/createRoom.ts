import { IRoom } from './entities';
import { IRoomDataBasePresenter } from '../DAL/roomDataBasePresenter';
import { v4 as uuidv4 } from 'uuid';
const { check, validationResult } = require('express-validator')

export interface ICreateRoom {
    routeName: string;
    validator: Array<any>;
    createRoom: (req: any, res: any) => Promise<void>;
};

export class CreateRoom implements ICreateRoom {
    readonly routeName = '/create-room';
    readonly validator = [
        check('name', 'Wrong name').isLength({ min: 1 }),
        check('admin', 'Wrong admin id').isUUID(),
        check('members', 'Members can not be empty').isArray({ min: 1 }),
    ];

    constructor(private dataBase: IRoomDataBasePresenter) {

    };

    createRoom = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            if (isError) {
                return res.status(400).json({ error, message, status: 'error' });
            }
            const { name, admin, members, logo } = req.body;
            const room: IRoom = { name, admin, members, logo, createdAt: Date.now(), uid: uuidv4(), id: Date.now() };
            const roomFromDB = await this.dataBase.createRoom(room);
            if (roomFromDB) {
                res.status(200).send({ status: 'ok', message: 'success', data: roomFromDB });
            } else {
                res.status(400).send({ status: 'error', message: 'room is not created' });
            }
        } catch (error) {
            console.warn('CreateRoom -> createRoom: ', error);
            res.status(400).send({ status: 'error', message: 'room is not created', error });
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
