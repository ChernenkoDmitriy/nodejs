import { IDeleteFCMTokenUseCase } from "../useCases/deleteFCMTokenUseCase/DeleteFCMTokenUseCase.ts";
import { IRegisterFCMTokenUseCase } from "../useCases/registerFCMTokenUseCase/RegisterFCMTokenUseCase";
import { IUpdateFCMTokenUseCase } from "../useCases/updateFCMTokenUseCase/UpdateFCMTokenUseCase";

const { validationResult } = require('express-validator');

export class NotificationController {
    constructor(
        private registerFCMTokenUseCase: IRegisterFCMTokenUseCase,
        private updateFCMTokenUseCase: IUpdateFCMTokenUseCase,
        private deleteFCMTokenUseCase: IDeleteFCMTokenUseCase,
    ) { }

    registerFCMToken = async (req: any, res: any) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array(), messageKey: 'not_valid', status: 'error' });
            }
            const data = await this.registerFCMTokenUseCase.registerFCMToken(req.body);
            if (data && data.status === 'ok') {
                res.status(200).send(data);
            } else {
                res.status(400).send(data);
            }
        } catch (error) {
            res.status(500).send({ messageKey: 'Server error', error, status: 'error' });
        }
    }

    updateFCMToken = async (req: any, res: any) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array(), messageKey: 'not_valid', status: 'error' });
            }
            const data = await this.updateFCMTokenUseCase.updateFCMToken(req.body);
            if (data && data.status === 'ok') {
                res.status(200).send(data);
            } else {
                res.status(400).send(data);
            }
        } catch (error) {
            res.status(500).send({ messageKey: 'Server error', error, status: 'error' });
        }
    }

    deleteFCMToken = async (req: any, res: any) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array(), messageKey: 'not_valid', status: 'error' });
            }
            const data = await this.deleteFCMTokenUseCase.deleteFCMToken(req.body);
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
