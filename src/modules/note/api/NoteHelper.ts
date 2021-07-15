import { INote, INotePoint, INotePriority } from "../types/INote";

export interface INoteHelper {
    getDtoNotes: (notes: INote[]) => INote[];
    createNote: (title: string, content: string, points: INotePoint[], status: string, priority: INotePriority, room: string) => INote;
}

export class NoteHelper implements INoteHelper {

    private getDtoNote = ({ title, content, points, status, lastUpdate, priority, _id, room }: INote) => {
        return { title, content, points, status, lastUpdate, priority, id: _id, room };
    }

    getDtoNotes = (notes: INote[]) => {
        const notesDto = notes.map(note => this.getDtoNote(note));
        return notesDto;
    }

    createNote = (title, content, points, status, priority, room) => {
        const note: INote = { title, content, points, status, lastUpdate: Date.now(), priority, room };
        return note;
    }

}
