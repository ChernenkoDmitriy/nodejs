import { ILogger } from "../logger";

export interface IScramPokerManager {
    onStart: (event: any) => void;
    onClose: (event: any) => void;
    onJoin: (event: any) => void;
    onSendVoting: (event: any) => void;
    onShowResults: (event: any) => void;
    onRefresh: (event: any) => void;
};

export class ScramPokerManager implements IScramPokerManager {
    constructor(private logger: ILogger) {

    };

};