import { UserAuthorizationFactory } from "../moduls/userAuthentication/authorization/factory/UserAuthorizationFactory";
import { UserRegisterFactory } from "../moduls/userAuthentication/registration/factory/UserRegisterFactory";

export class RouterCreator {
    static readonly registration = UserRegisterFactory.get();
    static readonly authorization = UserAuthorizationFactory.get();
}
