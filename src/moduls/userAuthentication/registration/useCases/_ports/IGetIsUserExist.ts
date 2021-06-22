import { IResponse } from "../../../../../types/IResponse";
import { IUser } from "../../../types/IUser";

export interface IGetIsUserExist {
    getIsUserExist: (email: string) => Promise<boolean>;
}
