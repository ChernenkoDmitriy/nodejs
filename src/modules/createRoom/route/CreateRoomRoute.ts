import { ICreateRoomUseCase } from "../useCases/CreateRoomUseCase";

const { validationResult } = require('express-validator');
const { check } = require('express-validator')

export interface ICreateRoomRoute {
    routeName: string;
    validator: Array<any>;
    createRoom: (req: any, res: any) => Promise<void>;
}

export class CreateRoomRoute implements ICreateRoomRoute {
    readonly routeName = '/create-room';
    readonly validator = [
        check('name', 'Wrong name').isLength({ min: 1 }),
        check('admin', 'Wrong admin id').isUUID(),
        check('members', 'Members can not be empty').isArray( ),
    ];

    constructor(private  createRoomUseCase:ICreateRoomUseCase) {

    }

    createRoom = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            const { name, admin, members, logo } = req.body;
            if (isError) {
                return res.status(200).json({ error, message, status: 'error' });
            }
            const room = await this.createRoomUseCase.createRoom(name, admin, members, logo);
            if (room) {
                res.status(200).send({ message: '', data: room, ok: true });
            } else {
                res.status(200).send({ status: 'error', message: 'room is not created' });
            }
        } catch (error) {
            console.warn('CreateRoom -> createRoom: ', error);
            res.status(400).send({ status: 'error', message: 'room is not created', error });
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
