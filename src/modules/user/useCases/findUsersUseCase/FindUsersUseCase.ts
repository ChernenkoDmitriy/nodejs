import { IResponse } from "../../../../types/IResponse";
import { IUserHelper } from "../../api/UserHelper";
import { IUserPersistance } from "../../DAL/userPersistance";

export interface IFindUsersUseCase {
    findUsers: (body: { findBy: string, value: string }) => Promise<IResponse>;
}

export class FindUsersUseCase implements IFindUsersUseCase {
    constructor(
        private userHelper: IUserHelper,
        private userPersistance: IUserPersistance,
    ) { }

    findUsers = async ({ findBy, value }) => {
        try {
            const users = await this.userPersistance.findUsers(findBy, value);
            const membersDto = this.userHelper.getDtoMembers(users);
            const result = { status: 'ok', data: membersDto };
            return result;
        } catch (error) {
            console.warn('UserAuthorizationUseCase -> authorize: ', error);
            const message = error && error.message ? error.message : '';
            return { status: 'error', error: error, message };
        }
    }

}
