export interface ISendByTokens {
    sendByTokens: (tokens: string[], title: string, body: string, payload?: any) => Promise<void>;
}
