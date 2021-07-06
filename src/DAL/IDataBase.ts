export interface IDataBase {
    writeAll: (fileName: string, data: any) => Promise<boolean>;
    write: (fileName: string, value: any) => Promise<any>;
    read: (fileName: string) => Promise<any[] | null>;
};