import { v4 as uuidv4 } from 'uuid';
import { ITeamRadarManager } from '../teamRadar';
import { ITeamRadar } from '../teamRadar/entites';
const { check, validationResult } = require('express-validator')

export interface ICreateVoting {
    routeName: string;
    validator: Array<any>;
    createVoting: (req: any, res: any) => Promise<void>;
};

export class CreateVoting implements ICreateVoting {
    constructor(private teamRadarManager: ITeamRadarManager) {

    };

    readonly routeName = '/create-team-radar-voting';
    readonly validator = [
        check('uid', 'Wrong uid').isUUID(),
    ];

    createVoting = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            if (isError) {
                return res.status(400).json({ error, message });
            }
            const { uid } = req.body;
            const radar = await this.teamRadarManager.createVoting(uid);
            if (radar) {
                res.status(200).send({ status: 'ok', message: '', data: radar });
            } else {
                res.status(400).send({ status: 'error', message: 'Team radar is not found' });
            }
        } catch (error) {
            console.warn('CreateVoting -> createVoting: ', error);
            res.status(400).send({ status: 'error', message: 'Team radar is not found', error });
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
