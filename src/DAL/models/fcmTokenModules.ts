import { Schema, model } from 'mongoose';

const FCMTokenSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    token: { type: String, required: true,  unique: true },
    language: { type: String, required: true },
});

module.exports = model('FCMToken', FCMTokenSchema);
