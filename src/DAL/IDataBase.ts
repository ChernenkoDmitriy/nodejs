export interface IDataBase {
    write: (fileName: string, value: any) => Promise<any>;
    read: (fileName: string) => Promise<any[] | null>;
};