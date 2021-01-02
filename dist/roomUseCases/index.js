"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const { check, validationResult } = require('express-validator');
;
class RoomUseCases {
    constructor(dataBase) {
        this.dataBase = dataBase;
        this.createRoomRoute = '/create-room';
        this.createRoomValidator = [
            check('name', 'Wrong name').isLength({ min: 1 }),
            check('admin', 'Wrong admin id').isUUID(),
            check('members', 'Members can not be empty').isArray({ min: 1 }),
        ];
        this.addMemberToRoomRoute = '/add-member-to-room';
        this.addMemberToRoomValidator = [
            check('roomUid', 'Wrong roomUid').isUUID(),
            check('memberUid', 'Wrong memberUid').isUUID(),
        ];
        this.removeMemberFromRoomRoute = '/remove-member-from-room';
        this.removeMemberFromRoomValidator = [
            check('roomUid', 'Wrong roomUid').isUUID(),
            check('memberUid', 'Wrong memberUid').isUUID(),
        ];
        this.updateRoomNameRoute = '/update-room-name';
        this.updateRoomNameValidator = [
            check('roomUid', 'Wrong roomUid').isUUID(),
            check('memberUid', 'Wrong memberUid').isUUID(),
            check('name', 'Wrong name').isLength({ min: 1 }),
        ];
        this.createRoom = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, message, isError } = this.validateRequest(req);
                if (isError) {
                    return res.status(400).json({ error, message, status: 'error' });
                }
                const { name, admin, members, logo } = req.body;
                const room = { name, admin, members, logo, createdAt: Date.now(), uid: uuid_1.v4(), id: Date.now() };
                const isDone = yield this.dataBase.createRoom(room);
                if (isDone) {
                    res.status(200).send({ status: 'ok', message: 'success', room });
                }
                else {
                    res.status(400).send({ status: 'error', message: 'room is not added' });
                }
            }
            catch (error) {
                console.warn('Authentication -> registration: ', error);
                res.status(400).send({ status: 'error', message: 'room is not added', error });
            }
        });
        this.addMemberToRoom = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, message, isError } = this.validateRequest(req);
                if (isError) {
                    return res.status(400).json({ error, message, status: 'error' });
                }
                const { roomUid, memberUid } = req.body;
                const room = yield this.dataBase.getRoomByUid(roomUid);
                if (room && !room.members.includes(memberUid)) {
                    const isDone = yield this.dataBase.addMemberToRoom(roomUid, memberUid);
                    if (isDone) {
                        res.status(200).send({ status: 'ok', message: 'success' });
                    }
                    else {
                        res.status(400).send({ status: 'error', message: 'user is not added' });
                    }
                }
                else {
                    res.status(400).send({ status: 'error', message: 'no such room or user alredy added' });
                }
            }
            catch (error) {
                console.warn('DataBasePresenter -> addMemberToRoom: ', error);
                res.status(400).send({ status: 'error', message: 'user is not added', error });
            }
        });
        this.removeMemberFromRoom = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, message, isError } = this.validateRequest(req);
                if (isError) {
                    return res.status(400).json({ error, message, status: 'error' });
                }
                const { roomUid, memberUid } = req.body;
                const room = yield this.dataBase.getRoomByUid(roomUid);
                if (room && room.members.includes(memberUid)) {
                    const isDone = yield this.dataBase.removeMemberFromRoom(roomUid, memberUid);
                    if (isDone) {
                        res.status(200).send({ status: 'ok', message: 'success' });
                    }
                    else {
                        res.status(400).send({ status: 'error', message: 'user is not removed' });
                    }
                }
                else {
                    res.status(400).send({ status: 'error', message: 'no such room or user not found in room' });
                }
            }
            catch (error) {
                console.warn('DataBasePresenter -> quitRoom: ', error);
                res.status(400).send({ status: 'error', message: 'user is not removed', error });
            }
        });
        this.updateRoomName = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, message, isError } = this.validateRequest(req);
                if (isError) {
                    return res.status(400).json({ error, message, status: 'error' });
                }
                const { roomUid, memberUid, name } = req.body;
                const room = yield this.dataBase.getRoomByUid(roomUid);
                if (room && room.members.includes(memberUid)) {
                    const isDone = yield this.dataBase.updateRoomName(roomUid, memberUid, name);
                    if (isDone) {
                        res.status(200).send({ status: 'ok', message: 'success' });
                    }
                    else {
                        res.status(400).send({ status: 'error', message: 'name is not updated' });
                    }
                }
                else {
                    res.status(400).send({ status: 'error', message: 'no such room or user not found in room' });
                }
            }
            catch (error) {
                console.warn('DataBasePresenter -> quitRoom: ', error);
                res.status(400).send({ status: 'error', message: 'name is not updated', error });
            }
        });
        this.validateRequest = (req) => {
            const result = { error: [], message: '', isError: false };
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                result.error = errors.array();
                result.message = 'Wrong request data';
                result.isError = true;
            }
            return result;
        };
    }
    ;
}
exports.RoomUseCases = RoomUseCases;
;
//# sourceMappingURL=index.js.map