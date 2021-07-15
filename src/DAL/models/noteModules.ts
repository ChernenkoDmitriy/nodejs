import { Schema, model } from 'mongoose';

const NoteSchema = new Schema({
    room: { type: Schema.Types.ObjectId, ref: 'Room' },
    title: { type: String  },
    content: { type: String  },
    status: { type: String },
    priority: { type: String },
    points: [{ type: Schema.Types.Mixed }],
    lastUpdate: { type: Number },
});

module.exports = model('Note', NoteSchema);
