export interface ISendRegistrationMail {
    sendActivationMail: (email: string, link: string) => Promise<void>;
}
