export interface ISendToMany {
    sendToMany: (uids: string[], event: string, data: any) => void;
}
