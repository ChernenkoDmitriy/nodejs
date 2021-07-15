import { Schema, model } from 'mongoose';

const RoomSchema = new Schema({
    name: { type: String, required: true },
    admin: { type: String, required: true },
    logo: { type: String },
    createdAt: { type: Number },
    members: [{ type: Schema.Types.Mixed }],
});

module.exports = model('Room', RoomSchema);
