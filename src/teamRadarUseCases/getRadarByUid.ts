import { ITeamRadarManager } from '../teamRadar';
const { check, validationResult } = require('express-validator')

export interface IGetRadarByUid {
    routeName: string;
    validator: Array<any>;
    getRadarByUid: (req: any, res: any) => Promise<void>;
};

export class GetRadarByUid implements IGetRadarByUid {
    constructor(private teamRadarManager: ITeamRadarManager) {

    };

    readonly routeName = '/get-team-radar-byuid';
    readonly validator = [
        check('uid', 'Wrong uid').isUUID(),
    ];

    getRadarByUid = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            if (isError) {
                return res.status(400).json({ error, message });
            }
            const { uid } = req.body;
            const radar = await this.teamRadarManager.getRadarByUid(uid);
            if (radar) {
                res.status(200).send({ status: 'ok', message: '', data: radar });
            } else {
                res.status(400).send({ status: 'error', message: 'Team radar is not found' });
            }
        } catch (error) {
            console.warn('GetRadarByUid -> getRadarByUid: ', error);
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
