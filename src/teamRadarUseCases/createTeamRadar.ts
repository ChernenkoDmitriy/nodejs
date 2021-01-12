import { v4 as uuidv4 } from 'uuid';
import { ITeamRadarManager } from '../teamRadar';
import { ITeamRadar } from '../teamRadar/entites';
const { check, validationResult } = require('express-validator')

export interface ICreateTeamRadar {
    routeName: string;
    validator: Array<any>;
    createTeamRadar: (req: any, res: any) => Promise<void>;
};

export class CreateTeamRadar implements ICreateTeamRadar {
    constructor(private teamRadarManager: ITeamRadarManager) {

    };

    readonly routeName = '/create-team-radar';
    readonly validator = [
        check('roomUid', 'Wrong roomUid').isUUID(),
        check('valueFormatter', 'Wrong valueFormatter').isArray({ min: 3 }),
    ];

    createTeamRadar = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            if (isError) {
                return res.status(400).json({ error, message });
            }
            const { roomUid, valueFormatter } = req.body;
            const radar = await this.teamRadarManager.createRadar(roomUid, valueFormatter);
            if (radar) {
                res.status(200).send({ status: 'ok', message: '', data: radar });
            } else {
                res.status(400).send({ status: 'error', message: 'Team radar is not added' });
            }
        } catch (error) {
            console.warn('CreateTeamRadar -> createTeamRadar: ', error);
            res.status(400).send({ status: 'error', message: 'Team radar is not added', error });
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