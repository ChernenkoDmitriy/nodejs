
import { NotePersistance } from "../DAL/NotePersistance";
import { NoteController } from "../controller/NoteController";
import { RoomDataBase } from "../../room/DAL/RoomDataBase";
import { NoteHelper } from "../api/NoteHelper";
import { SocketIOWrapper } from "../../../socketIO";
import { CreateNoteUseCase } from "../useCases/createNoteUseCase/CreateNoteUseCase";
const NoteModel = require('../../../DAL/models/noteModule');
const RoomModel = require('../../../DAL/models/roomModule');

export class NoteFactory {
    private static presenter: NoteController;

    static get() {
        if (!NoteFactory.presenter) {
            NoteFactory.presenter = new NoteFactory().createPresenter();
        }
        return NoteFactory.presenter;
    }

    private createPresenter = () => {
        const socket = new SocketIOWrapper();
        const roomPersistance = new RoomDataBase(RoomModel);
        const notePersistance = new NotePersistance(NoteModel);
        const noteHelper = new NoteHelper();

        new CreateNoteUseCase(noteHelper, notePersistance, roomPersistance, socket);

        return null;
    }
}
