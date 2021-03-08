export interface IDataBase {
    write: (fileName: string, value: any) => Promise<void>;
    read: (fileName: string) => Promise<any[] | null>;
};