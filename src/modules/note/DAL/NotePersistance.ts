import { INote } from "../types/INote";

export interface INotePersistance {
    saveNote: (note: INote) => Promise<INote>;
}

export class NotePersistance implements INotePersistance {
    constructor(private dataBase: any) {

    }

    saveNote = async (note: INote) => {
        try {
            const noteDb = await this.dataBase.create(note);
            return noteDb;
        } catch (error) {
            console.warn('NotePersistance -> saveRoom: ', error);
        }
    }

}
