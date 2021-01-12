import { ITeamRadarManager } from '../teamRadar';
const { check, validationResult } = require('express-validator')

export interface IVoteRadar {
    routeName: string;
    validator: Array<any>;
    voteRadar: (req: any, res: any) => Promise<void>;
};

export class VoteRadar implements IVoteRadar {
    constructor(private teamRadarManager: ITeamRadarManager) {

    };

    readonly routeName = '/vote-team-radar';
    readonly validator = [
        check('uid', 'Wrong uid').isUUID(),
        check('periodVotingUid', 'Wrong periodVotingUid').isUUID(),
    ];

    voteRadar = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            if (isError) {
                return res.status(400).json({ error, message });
            }
            const { uid, periodVotingUid, userVoting } = req.body;
            const isVoted = await this.teamRadarManager.vote(uid, periodVotingUid, userVoting);
            if (isVoted) {
                res.status(200).send({ status: 'ok', message: '', data: isVoted });
            } else {
                res.status(400).send({ status: 'error', message: 'Team radar is not found' });
            }
        } catch (error) {
            console.warn('VoteRadar -> voteRadar: ', error);
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
