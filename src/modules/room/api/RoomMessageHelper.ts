import { ILocalization } from "../../../localization/ILocalization";
import { IFCMToken } from "../../notification/types/IFCMToken";

export interface IRoomMessageHelper {

}

export class RoomMessageHelper implements IRoomMessageHelper {
    constructor(private localization: ILocalization) {

    }

    getMsgCreateRoom = (fcmTokens: IFCMToken[]) => {

    }

}
