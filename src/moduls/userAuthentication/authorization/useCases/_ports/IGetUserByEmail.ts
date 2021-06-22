import { IUser } from "../../../types/IUser";

export interface IGetUserByEmail {
    getUserByEmail: (email: string, password: string) => Promise<{ isSuccessful: boolean; error?: any; data?: any; }>;
}
