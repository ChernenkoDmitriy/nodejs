import { IResponse } from "../../../../types/IResponse";
import { ITokenHelper } from "../../api/TokenHelper";
import { IUserHelper } from "../../api/UserHelper";
import { IGetIsUserExist } from "../_ports/IGetIsUserExist";
import { ISaveUser } from "../_ports/ISaveUser";
import { ISendRegistrationMail } from "../_ports/ISendRegistrationMail";

export interface IUserRegisterUseCase {
    register: (body: { name: string, phone: string, email: string, password: string }) => Promise<IResponse>;
}

export class UserRegisterUseCase implements IUserRegisterUseCase {
    constructor(
        private userHelper: IUserHelper,
        private userDataBase: ISaveUser & IGetIsUserExist,
        private registrationMailHelper: ISendRegistrationMail,
        private tokenHelper: ITokenHelper,
    ) { }

    register = async ({ name, password, email }) => {
        try {
            let result;
            const IsUserExist = await this.userDataBase.getIsUserExist(email);
            if (IsUserExist) {
                result = { error: 'user_already_exist', status: 'error', messageKey: 'user_already_exist' };
            } else {
                const user = await this.userHelper.createUser(name, password, email);
                await this.userDataBase.saveUser(user);

                await this.registrationMailHelper.sendActivationMail(user.email, user.activationLink);

                const userDto = this.userHelper.getDtoUser(user);
                console.log(userDto)
                const tokens = this.tokenHelper.generateTokens(userDto);
                console.log(tokens)
                this.tokenHelper.saveToken(user.uid, tokens.refreshToken);

                result = { status: 'ok', data: { user: userDto, ...tokens } };
            }
            return result;
        } catch (error) {
            console.warn('UserRegisterUseCase -> register: ', error);
            const message = error && error.message ? error.message : '';
            return { status: 'error', error: error, message };
        }
    }

}
