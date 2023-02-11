import { IUser } from "../Entities/User";

export interface IAuthService{
    signup(email:string, password:string):Promise<IUser>
    login(email:string, password:string):Promise<IUser | null>
}