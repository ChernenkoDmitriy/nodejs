import { v4 as uuidv4 } from 'uuid';
import { ITeamRadarManager } from '../teamRadar';
import { ITeamRadar } from '../teamRadar/entites';
const { check, validationResult } = require('express-validator')

export interface ICloseTeamRadarVoting {
    routeName: string;
    validator: Array<any>;
    closeTeamRadarVoting: (req: any, res: any) => Promise<void>;
};

export class CloseTeamRadarVoting implements ICloseTeamRadarVoting {
    constructor(private teamRadarManager: ITeamRadarManager) {

    };

    readonly routeName = '/close-team-radar-voting';
    readonly validator = [
        check('uid', 'Wrong uid').isUUID(),
        check('periodVotingUid', 'Wrong periodVotingUid').isUUID(),
    ];

    closeTeamRadarVoting = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            if (isError) {
                return res.status(400).json({ error, message });
            }
            const { roomUid, periodVotingUid } = req.body;
            const radar = await this.teamRadarManager.closeVoting(roomUid, periodVotingUid);
            if (radar) {
                res.status(200).send({ status: 'ok', message: '', data: radar });
            } else {
                res.status(400).send({ status: 'error', message: 'Team radar is not found' });
            }
        } catch (error) {
            console.warn('CloseTeamRadarVoting -> closeTeamRadarVoting: ', error);
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
