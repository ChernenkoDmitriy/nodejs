import { ITeamRadarManager } from '../teamRadar';
const { check, validationResult } = require('express-validator')

export interface IGetTeamRadar {
    routeName: string;
    validator: Array<any>;
    getTeamRadar: (req: any, res: any) => Promise<void>;
};

export class GetTeamRadar implements IGetTeamRadar {
    constructor(private teamRadarManager: ITeamRadarManager) {

    };

    readonly routeName = '/get-team-radars';
    readonly validator = [
        check('roomUid', 'Wrong roomUid').isUUID(),
    ];

    getTeamRadar = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            if (isError) {
                return res.status(400).json({ error, message });
            }
            const { roomUid } = req.body;
            const teamRadar = await this.teamRadarManager.getRadarByRoomUid(roomUid);
            if (teamRadar) {
                res.status(200).send({ status: 'ok', message: '', data: teamRadar });
            } else {
                res.status(400).send({ status: 'error', message: 'Team radar is not found' });
            }
        } catch (error) {
            console.warn('CreateTeamRadar -> createTeamRadar: ', error);
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
