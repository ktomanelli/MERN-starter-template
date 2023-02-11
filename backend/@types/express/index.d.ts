import { IUser } from "../../src/Entities/User";

declare global{
    namespace Express {
        interface Request {
            currentUser: IUser
        }
        interface Response {
            attachRefreshToken():Promise<void>
        }
    }
}