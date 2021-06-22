import { IGetAuthResponse } from "../useCases/_ports/IGetAuthResponse";

export class UserAuthorizationHelper implements IGetAuthResponse {

    getUserForResponse = (dataBaseStatus: { isSuccessful: boolean; error?: any; data?: any; }) => {
        let result;
        if (dataBaseStatus && dataBaseStatus.isSuccessful && dataBaseStatus.data) {
            const data = { ...dataBaseStatus.data };
            delete data.password;
            result = { status: 'ok', data };
        } else {
            result = { status: 'error', error: dataBaseStatus.error, message: 'Data base error' };
        }
        return result;
    }

}
