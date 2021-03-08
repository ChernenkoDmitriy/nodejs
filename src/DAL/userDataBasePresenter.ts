// import { IUser } from "../user/entities";
// import { IDataBase } from "./dataBaseFile";

// const USERS_PATH = './src/DAL/data/users.json';

// export interface IUserRepository {
//     addUser: (user: IUser) => Promise<IUser | null>;
//     findUserByEmailAndPassword: (email: string, hashPassword: string) => Promise<IUser | undefined>;
//     findtUserByUid: (uid: string, token: string) => Promise<IUser | undefined>;
//     findUsers: (findBy: 'email' | 'phone' | 'name', value: string, token: string) => Promise<IUser[]>;
//     updateUser: (user: IUser) => Promise<IUser | null>;
// };

// export class UserDataBasePresenter implements IUserRepository {
//     constructor(private dataBase: IDataBase) {

//     };

//     addUser = async (user: IUser): Promise<IUser | null> => {
//         try {
//             const users: IUser[] = await this.dataBase.readFile(USERS_PATH);
//             if (users.find(item => item.email === user.email)) {
//                 return null;
//             } else {
//                 users.push(user);
//                 await this.dataBase.writeToFile(USERS_PATH, users)
//                 return user;
//             }
//         } catch (error) {
//             console.warn('UserDataBasePresenter -> addUser: ', error);
//             return null;
//         }
//     };

//     findUserByEmailAndPassword = async (email: string, hashPassword: string): Promise<IUser | undefined> => {
//         try {
//             const users: IUser[] = await this.dataBase.readFile(USERS_PATH);
//             const user = users.find(item => (item.email === email && item.hashPassword === hashPassword));
//             return user;
//         } catch (error) {
//             console.warn('DataBasePresenter -> userAuthorization: ', error);
//         }
//     };

//     findtUserByUid = async (uid: string, token: string): Promise<IUser | undefined> => {
//         try {
//             const users: IUser[] = await this.dataBase.readFile(USERS_PATH);
//             const user = users.find(item => (item.uid === uid && item.token === token));
//             return user;
//         } catch (error) {
//             console.warn('DataBasePresenter -> findtUserByUid: ', error);
//         }
//     };

//     findUsers = async (findBy: 'email' | 'phone' | 'name', value: string, token: string) => {
//         try {
//             let result = [];
//             const lowerCaseValue = value.toLowerCase();
//             if (findBy === 'email' || findBy === 'phone' || findBy === 'name') {
//                 const users: IUser[] = await this.dataBase.readFile(USERS_PATH);
//                 result = users.filter(user => user[findBy].toLowerCase().match(lowerCaseValue) && user.token !== token);
//             }
//             return result;
//         } catch (error) {
//             console.warn('DataBasePresenter -> userRegistration: ', error);
//             return [];
//         }
//     };

//     updateUser = async (user: IUser): Promise<IUser | null> => {
//         try {
//             const users: IUser[] = await this.dataBase.readFile(USERS_PATH);
//             const filteredUsers = users.filter(item => item.uid !== user.uid);
//             filteredUsers.push(user);
//             await this.dataBase.writeToFile(USERS_PATH, filteredUsers)
//             return user;
//         } catch (error) {
//             console.warn('DataBasePresenter -> updateUser: ', error);
//             return null;
//         }
//     };
// };
