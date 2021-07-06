export interface IRemoveToken {
    removeToken: (refreshToken: string) => Promise<string>;
}
