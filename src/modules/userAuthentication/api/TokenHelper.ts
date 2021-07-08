import { ITokenPersistance } from "../DAL/TokenPersistance";
import { IToken } from "../types/IToken";

const jwt = require('jsonwebtoken');
const JWT_REFRESH_SECRET = 'jwt-asdmas-dfsdlfds';
const EXPIRES_IN_REFRESH_SECRET = '30d';

export interface ITokenHelper {
    generateTokens: (payload: any) => { refreshToken: string };
    findToken: (userId: string) => Promise<IToken>;
    saveToken: (userId: string, refreshToken: string) => Promise<string>;
    validateRefreshToken: (token: string) => string;
    clearTokens: (userId: string) => Promise<void>;
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
            const userData = jwt.verify(token, JWT_REFRESH_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }

    clearTokens = async (userId: string) => {
        const token: any = await this.tokenPersistance.findToken(userId);
        if (token) {
            const refreshToken = token.refreshToken.filter(refreshToken => this.validateRefreshToken(refreshToken));
            if (refreshToken.length !== token.refreshToken.length) {
                await this.tokenPersistance.updateTokens(userId, refreshToken);
            }
        }
    }

    saveToken = async (userId: string, refreshToken: string) => {
        const token = await this.tokenPersistance.saveToken(userId, refreshToken);
        return token;
    }

    findToken = async (userId: string) => {
        const tokenData = await this.tokenPersistance.findToken(userId);
        return tokenData;
    }

}
