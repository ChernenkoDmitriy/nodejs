import { IAddListenerSocket, ISendToMany, SOCKET_EVENTS } from "../../../../socketIO";
import { IRoomPersistance } from "../../../room/DAL/RoomDataBase";
import { INoteHelper } from "../../api/NoteHelper";
import { INotePersistance } from "../../DAL/NotePersistance";
import { INotePoint, INotePriority } from "../../types/INote";

export interface ICreateNoteUseCase {
    createNote: (body: {
        title: string;
        content: string;
        points: INotePoint[];
        status: 'done' | 'inProgress' | 'new';
        priority: INotePriority;
    }) => Promise<void>;
}

export class CreateNoteUseCase implements ICreateNoteUseCase {
    constructor(
        private noteHelper: INoteHelper,
        private notePersistance: INotePersistance,
        private roomPersistance: IRoomPersistance,
        private socket: ISendToMany & IAddListenerSocket,
    ) {
        this.socket.addListener(SOCKET_EVENTS.CREATE_NOTE, this.createNote);
    }

    createNote = async ({ title, content, points, status, priority, roomId }) => {
        try {
            const note = this.noteHelper.createNote(title, content, points, status, priority, roomId);
            const noteDb = await this.notePersistance.saveNote(note);
            const room = await this.roomPersistance.getRoom(roomId);
            if (room) {
                const usersId = room.members.map(member => member.id);
                this.socket.sendToMany(usersId, SOCKET_EVENTS.CREATE_NOTE, noteDb);
            }
        } catch (error) {
            console.warn('UserRegisterUseCase -> register: ', error);
        }
    }

}
