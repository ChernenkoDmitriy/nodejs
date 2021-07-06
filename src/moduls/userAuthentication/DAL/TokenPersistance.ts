import { IDataBase } from "../../../DAL/IDataBase";
import { IToken } from "../types/IToken";

const TOKENS = './src/DAL/data/tokens.json';

export interface ITokenPersistance {
    saveToken: (userId: string, refreshToken: string) => Promise<any>;
    deleteToken: (refreshToken: string) => Promise<any>;
    findToken: (refreshToken: string) => Promise<any>;
}

export class TokenPersistance implements ITokenPersistance {
    constructor(private dataBase: IDataBase) {

    }

    findToken = async (refreshToken: string) => {
        try {
            const tokens: IToken[] = await this.dataBase.read(TOKENS);
            const tokenObj = tokens.find(token => (token.refreshToken === refreshToken));
            return { isSuccessful: true, data: tokenObj };
        } catch (error) {
            console.warn('TokenPersistance -> findToken: ', error);
            return { isSuccessful: false, data: null, error: error };
        }
    }


    deleteToken = async (refreshToken: string) => {
        try {
            const tokens: IToken[] = await this.dataBase.read(TOKENS);
            const newTokens = tokens.filter(token => (token.refreshToken !== refreshToken));
            await this.dataBase.writeAll(TOKENS, newTokens);
            return { isSuccessful: true };
        } catch (error) {
            console.warn('TokenPersistance -> deleteToken: ', error);
            return { isSuccessful: false, error: error };
        }
    }

    saveToken = async (userId: string, refreshToken: string) => {
        try {
            const tokens: IToken[] = await this.dataBase.read(TOKENS);
            const tokenObj = tokens.find(token => (token.userId === userId));
            if (tokenObj) {
                const newTokens = tokens.map(token => {
                    if (token.userId === userId) {
                        token.refreshToken = refreshToken;
                        return token;
                    }
                    return token;
                });
                await this.dataBase.writeAll(TOKENS, newTokens);
            } else {
                await this.dataBase.write(TOKENS, { userId, refreshToken });
            }
            return { isSuccessful: true, data: refreshToken };
        } catch (error) {
            console.warn('TokenPersistance -> saveToken: ', error);
            return { isSuccessful: false, data: null, error: error };
        }
    }

}
