import { IResponse } from "../../../../../types/IResponse";

export interface IGetAuthResponse {
    getUserForResponse: (dataBaseStatus: { isSuccessful: boolean; error?: any; data?: any; }) => IResponse;
}
