import { IUser } from "../../types/IUser";

export interface ISaveUser {
    saveUser: (user: IUser) => Promise<{ isSuccessful: boolean; error?: any; data: IUser | null; }>;
}
