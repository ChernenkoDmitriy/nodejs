import { IResponse } from "../../../../types/IResponse";
import { ITokenHelper } from "../../api/TokenHelper";
import { IUserHelper } from "../../api/UserHelper";
import { IUserPersistance } from "../../DAL/userPersistance";
const bcrypt = require('bcryptjs');

export interface IUserAuthorizationUseCase {
    authorize: (body: { email: string, password: string }) => Promise<IResponse>;
}

export class UserAuthorizationUseCase implements IUserAuthorizationUseCase {
    constructor(
        private userHelper: IUserHelper,
        private userDataBase: IUserPersistance,
        private tokenHelper: ITokenHelper,
    ) { }

    authorize = async ({ email, password }) => {
        try {
            let result: IResponse = { status: 'error', error: {}, messageKey: 'user_not_found' };
            const user = await this.userDataBase.getUserByEmail(email);
            if (user && bcrypt.compareSync(password, user.password)) {
                const userDto = this.userHelper.getDtoUser(user);
                await this.tokenHelper.clearTokens(userDto.id);
                const tokens = this.tokenHelper.generateTokens(userDto);
                await this.tokenHelper.saveToken(userDto.id, tokens.refreshToken);
                result = { status: 'ok', data: { user: userDto, ...tokens } };
            }
            return result;
        } catch (error) {
            console.warn('UserAuthorizationUseCase -> authorize: ', error);
            const message = error && error.message ? error.message : '';
            return { status: 'error', error: error, message };
        }
    }

}
