import admin from "firebase-admin";
import { ISendByTokens } from "./IMessaging/ISendByTokens";

var serviceAccount = require('../../task-manager-58a7a-firebase-adminsdk-jb29f-20a2420b4e.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const testToken = 'cBVA8fYVShCY_Eq7T4YIZo:APA91bEZL0XNt-6HzrsO72bYye31wq1HCNhuwJWbTRFcTil170-99ogKJFCqj_XmIeAPyqjAbLsc9sxsnA-2opbJXVM_dOXKeL0X0ykWyIkFF5XrwLj0niADX0zIg4O_bx3lAalpvBdM';

export class FirebaseMessaging implements ISendByTokens {
    private static instance: FirebaseMessaging;

    constructor() {
        if (!FirebaseMessaging.instance) {
            FirebaseMessaging.instance = this;
        }
        return FirebaseMessaging.instance;
    }

    sendByTokens = async (tokens: string[], title: string, body: string, payload?: any) => {
        try {
            if (Array.isArray(tokens) && tokens.length) {
                const data: any = { body, title,   /* picture: 'JSON.stringify(picture)', */ };
                if (payload) {
                    data.payload = JSON.stringify(payload);
                }
                await admin.messaging().sendToDevice(tokens, { data }, {
                    // Required for background/quit data-only messages on iOS
                    contentAvailable: true,
                    // Required for background/quit data-only messages on Android
                    priority: 'high',
                });
            }
        } catch (error) {

        }

    }

    sendByLanguages = () => { }

}
