import { Schema, model } from 'mongoose';

const RoomSchema = new Schema({
    uid: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    admin: { type: String, required: true },
    logo: { type: String },
    createdAt: { type: Number },
    members: [{ type: Schema.Types.Mixed }],
});

module.exports = model('Room', RoomSchema);

// export interface IRoom {
//     uid: string;
//     name: string;
//     admin: string;
//     members: IRoomMember[];
//     logo: string;
// }

// export type IRoomMember = {
//     name: string;
//     email: string;
//     uid: string;
//     logo: string;
// }
