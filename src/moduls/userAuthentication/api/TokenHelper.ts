import { ITokenPersistance } from "../DAL/TokenPersistance";

const jwt = require('jsonwebtoken');
const JWT_REFRESH_SECRET = 'jwt-asdmas-dfsdlfds';
const EXPIRES_IN_REFRESH_SECRET = '30d';

export interface ITokenHelper {
    generateTokens: (payload: any) => { refreshToken: string };
    removeToken: (refreshToken: string) => Promise<string>;
    findToken: (refreshToken: string) => Promise<string>;
    saveToken: (userId: string, refreshToken: string) => Promise<string>;
    validateRefreshToken: (token: string) => string;
}

export class TokenHelper implements ITokenHelper {
    constructor(private tokenPersistance: ITokenPersistance) {

    }

    generateTokens = (payload: any) => {
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: EXPIRES_IN_REFRESH_SECRET });
        return { refreshToken };
    }

    validateRefreshToken = (token: string) => {
        try {
            const userData = jwt.verify(token, EXPIRES_IN_REFRESH_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }

    saveToken = async (userId: string, refreshToken: string) => {
        const token = await this.tokenPersistance.saveToken(userId, refreshToken)
        return token;
    }

    removeToken = async (refreshToken: string) => {
        const tokenData = await this.tokenPersistance.deleteToken(refreshToken)
        return tokenData;
    }

    findToken = async (refreshToken: string) => {
        const tokenData = await this.tokenPersistance.findToken(refreshToken)
        return tokenData;
    }

}
