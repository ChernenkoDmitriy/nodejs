import { IToken } from "../types/IToken";

export interface ITokenPersistance {
    saveToken: (userId: string, refreshToken: string) => Promise<any>;
    updateTokens: (userId: string, refreshToken: string[]) => Promise<void>;
    findToken: (userId: string) => Promise<IToken>;
}

export class TokenPersistance implements ITokenPersistance {
    constructor(private dataBase: any) {

    }

    findToken = async (userId: string) => {
        try {
            const tokenData = await this.dataBase.findOne({ user: userId });
            return tokenData;
        } catch (error) {
            console.warn('TokenPersistance -> findToken: ', error);
        }
    }

    updateTokens = async (userId: string, refreshToken: string[]) => {
        try {
            await this.dataBase.updateOne({ _id: userId }, refreshToken);
        } catch (error) {
            console.warn('TokenPersistance -> updateTokens: ', error);
        }
    }

    saveToken = async (userId: string, newRefreshToken: string) => {
        try {
            let token;
            const tokenData = await this.dataBase.findOne({ user: userId });
            if (tokenData) {
                tokenData.refreshToken.push(newRefreshToken);
                tokenData.save();
            } else {
                token = await this.dataBase.create({ user: userId, refreshToken: [newRefreshToken] })
            }
            return { data: token };
        } catch (error) {
            console.warn('TokenPersistance -> saveToken: ', error);
            return { isSuccessful: false, data: null, error: error };
        }
    }

}
