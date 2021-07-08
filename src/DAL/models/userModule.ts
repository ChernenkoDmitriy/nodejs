import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    name: { type: String, default: '' },
    phone: { type: String, default: '' },
    logo: { type: String, default: '' },
    uid: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String, required: true },
});

module.exports = model('User', UserSchema);

// name: string;
// phone: string;
// email: string;
// password: string;
// logo:string;
// id?: number;
// uid: string;
// isActivated: boolean;
// activationLink: string;