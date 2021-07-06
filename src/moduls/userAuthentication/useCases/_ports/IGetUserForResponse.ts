import { IDatabaseResponse } from "../../../../types/IDatabaseResponse";
import { IResponse } from "../../../../types/IResponse";

export interface IGetUserForResponse {
    getUserForResponse: (dataBaseStatus: IDatabaseResponse) => IResponse;
}
