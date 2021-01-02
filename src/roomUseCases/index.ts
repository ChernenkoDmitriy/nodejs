import { IRoom } from './entities';
import { IRoomDataBasePresenter } from '../DAL/roomDataBasePresenter';
import { v4 as uuidv4 } from 'uuid';
const { check, validationResult } = require('express-validator')

export interface IRoomUseCases {
    createRoom: (req: any, res: any) => Promise<void>;
    addMemberToRoom: (req: any, res: any) => Promise<void>;
    removeMemberFromRoom: (req: any, res: any) => Promise<void>;
    updateRoomName: (req: any, res: any) => Promise<void>;
};

export class RoomUseCases implements IRoomUseCases {
    readonly createRoomRoute = '/create-room';
    readonly createRoomValidator = [
        check('name', 'Wrong name').isLength({ min: 1 }),
        check('admin', 'Wrong admin id').isUUID(),
        check('members', 'Members can not be empty').isArray({ min: 1 }),
    ];
    readonly addMemberToRoomRoute = '/add-member-to-room';
    readonly addMemberToRoomValidator = [
        check('roomUid', 'Wrong roomUid').isUUID(),
        check('memberUid', 'Wrong memberUid').isUUID(),
    ];
    readonly removeMemberFromRoomRoute = '/remove-member-from-room';
    readonly removeMemberFromRoomValidator = [
        check('roomUid', 'Wrong roomUid').isUUID(),
        check('memberUid', 'Wrong memberUid').isUUID(),
    ];
    readonly updateRoomNameRoute = '/update-room-name';
    readonly updateRoomNameValidator = [
        check('roomUid', 'Wrong roomUid').isUUID(),
        check('memberUid', 'Wrong memberUid').isUUID(),
        check('name', 'Wrong name').isLength({ min: 1 }),
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
            const isDone = await this.dataBase.createRoom(room);
            if (isDone) {
                res.status(200).send({ status: 'ok', message: 'success', room });
            } else {
                res.status(400).send({ status: 'error', message: 'room is not added' });
            }
        } catch (error) {
            console.warn('Authentication -> registration: ', error);
            res.status(400).send({ status: 'error', message: 'room is not added', error });
        }
    };

    addMemberToRoom = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            if (isError) {
                return res.status(400).json({ error, message, status: 'error' });
            }
            const { roomUid, memberUid } = req.body;
            const room = await this.dataBase.getRoomByUid(roomUid);
            if (room && !room.members.includes(memberUid)) {
                const isDone = await this.dataBase.addMemberToRoom(roomUid, memberUid);
                if (isDone) {
                    res.status(200).send({ status: 'ok', message: 'success' });
                } else {
                    res.status(400).send({ status: 'error', message: 'user is not added' });
                }
            } else {
                res.status(400).send({ status: 'error', message: 'no such room or user alredy added' });
            }
        } catch (error) {
            console.warn('DataBasePresenter -> addMemberToRoom: ', error);
            res.status(400).send({ status: 'error', message: 'user is not added', error });
        }
    };

    removeMemberFromRoom = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            if (isError) {
                return res.status(400).json({ error, message, status: 'error' });
            }
            const { roomUid, memberUid } = req.body;
            const room = await this.dataBase.getRoomByUid(roomUid);
            if (room && room.members.includes(memberUid)) {
                const isDone = await this.dataBase.removeMemberFromRoom(roomUid, memberUid);
                if (isDone) {
                    res.status(200).send({ status: 'ok', message: 'success' });
                } else {
                    res.status(400).send({ status: 'error', message: 'user is not removed' });
                }
            } else {
                res.status(400).send({ status: 'error', message: 'no such room or user not found in room' });
            }
        } catch (error) {
            console.warn('DataBasePresenter -> quitRoom: ', error);
            res.status(400).send({ status: 'error', message: 'user is not removed', error });
        }
    };

    updateRoomName = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            if (isError) {
                return res.status(400).json({ error, message, status: 'error' });
            }
            const { roomUid, memberUid, name } = req.body;
            const room = await this.dataBase.getRoomByUid(roomUid);
            if (room && room.members.includes(memberUid)) {
                const isDone = await this.dataBase.updateRoomName(roomUid, memberUid, name);
                if (isDone) {
                    res.status(200).send({ status: 'ok', message: 'success' });
                } else {
                    res.status(400).send({ status: 'error', message: 'name is not updated' });
                }
            } else {
                res.status(400).send({ status: 'error', message: 'no such room or user not found in room' });
            }
        } catch (error) {
            console.warn('DataBasePresenter -> quitRoom: ', error);
            res.status(400).send({ status: 'error', message: 'name is not updated', error });
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
