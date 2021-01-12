export interface ILogger {
    log: (source: string, error: string, params?: string) => void;
};

export class Logger implements ILogger {
    log = (source: string, error: string, params?: string) => {
        console.warn(source, error, params);
    };
};