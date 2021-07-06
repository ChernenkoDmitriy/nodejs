export interface IGenerateTokens {
    generateTokens: (payload: any) => { accessToken: string, refreshToken: string };
}
