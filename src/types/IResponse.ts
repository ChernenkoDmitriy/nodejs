export interface IResponse {
    status: 'ok' | 'error' | string;
    error?: any;
    message?: string;
    data?: any;
}
