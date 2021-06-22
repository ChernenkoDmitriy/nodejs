import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    name: { type: String, default: '' },
    phone: { type: String, default: '' },
    logo: { type: String, default: '' },
    id: { type: Number },
    uid: { type: String, unique: true, required: true },
    token: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String, required: true },
});

module.exports = model('User', UserSchema);
