import { IResponse } from "../../../../types/IResponse";
import { IGetUserByEmail } from "../_ports/IGetUserByEmail";
import { IGetUserForResponse } from "../_ports/IGetUserForResponse";

export interface IUserAuthorizationUseCase {
    authorize: (body: { email: string, password: string }) => Promise<IResponse>;
}

export class UserAuthorizationUseCase implements IUserAuthorizationUseCase {
    constructor(
        private userAuthenticationHelper: IGetUserForResponse,
        private userDataBase: IGetUserByEmail,
    ) { }

    authorize = async ({ email, password }) => {
        try {
            const dataBaseStatus = await this.userDataBase.getUserByEmail(email, password);
            const response = this.userAuthenticationHelper.getUserForResponse(dataBaseStatus);
            return response;
        } catch (error) {
            console.warn('UserAuthorizationUseCase -> authorize: ', error);
            const message = error && error.message ? error.message : '';
            return { status: 'error', error: error, message };
        }
    }

}
