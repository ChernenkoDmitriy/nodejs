import { IResponse } from "../../../../../types/IResponse";
import { IGetAuthResponse } from "../_ports/IGetAuthResponse";
import { IGetUserByEmail } from "../_ports/IGetUserByEmail";

export interface IUserAuthorizationUseCase {
    authorize: (body: { email: string, password: string }) => Promise<IResponse>;
}

export class UserAuthorizationUseCase implements IUserAuthorizationUseCase {
    constructor(
        private userAuthorizationHelper: IGetAuthResponse,
        private userDataBase: IGetUserByEmail,
    ) { }

    authorize = async ({ email, password }) => {
        try {
            const dataBaseStatus = await this.userDataBase.getUserByEmail(email, password);
            const response = this.userAuthorizationHelper.getUserForResponse(dataBaseStatus);
            return response;
        } catch (error) {
            console.warn('UserAuthorizationUseCase -> authorize: ', error);
            const message = error && error.message ? error.message : '';
            return { status: 'error', error: error, message };
        }
    }

}
