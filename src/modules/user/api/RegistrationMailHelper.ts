export interface IRegistrationMailHelper {
    sendActivationMail: (email: string, link: string) => Promise<void>;
}

export class RegistrationMailHelper implements IRegistrationMailHelper {

    sendActivationMail = async (email: string, link: string) => {
        try {

        } catch (error) {

        }
    }

}
