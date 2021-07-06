export interface IFindToken {
    findToken: (refreshToken: string) => Promise<string>;
}
