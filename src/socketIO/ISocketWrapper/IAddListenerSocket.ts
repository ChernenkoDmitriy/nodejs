export interface IAddListenerSocket {
    addListener: (event: string, callBack: (msg: any) => void) => void;
}
