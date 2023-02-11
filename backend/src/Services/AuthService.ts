import { IAuthService } from "../Abstract/IAuthService";
import { IUser, User } from "../Entities/User";

export class AuthService implements IAuthService{
    constructor(){}

    public async signup(email:string,password:string): Promise<IUser>{
        const user = await User.create({
            email,
            password
        })
        return user;
    }

    public async login(email:string,password:string): Promise<IUser | null>{
        const user = await User.findOne({email}).exec();
        if(user?.id){
            const authorized = await user.comparePassword(password);
            if(authorized){
                return user
            }
        }
        return null;
    }   
}