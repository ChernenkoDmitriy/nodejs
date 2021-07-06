export interface ISaveToken {
    saveToken: (userId: string, refreshToken: string) => Promise<string>;
}
