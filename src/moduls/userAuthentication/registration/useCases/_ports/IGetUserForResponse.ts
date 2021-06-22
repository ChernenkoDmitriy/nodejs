import { IResponse } from "../../../../../types/IResponse";
import { IUser } from "../../../types/IUser";

export interface IGetUserForResponse {
    getUserForResponse: (user: IUser, dataBaseStatus: { isSuccessful: boolean; error?: any; data?: any; }) => IResponse;
}
