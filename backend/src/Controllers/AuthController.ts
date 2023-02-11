import { Request, Response } from "express";
import { JWT } from "../jwt";
import { IUser, User } from "../Entities/User";
import { IAuthService } from "../Abstract/IAuthService";

export class AuthController{
    private authService: IAuthService;
    constructor(authService:IAuthService){
        this.authService = authService;
    }

    public async signup(req:Request, res:Response){
        const {email, password} = req.body;
        try{
            const user = await this.authService.signup(email,password)
            if(user){
                const access_token = await JWT.Sign(2,{user:user.id});
                res.attachRefreshToken();
                res.status(200).json({access_token, user});
            }else{
                throw new Error('User not created')
            }
        }catch(e){
            console.log(e);
            res.status(500).json({success:false})
        }
    }

    public async login(req:Request,res:Response){
        const {email, password} = req.body;
        try{
            const user = await this.authService.signup(email,password)
            if(user){
                const access_token = await JWT.Sign(2,{user:user.id});
                res.attachRefreshToken();
                res.status(200).json({access_token, user});
            }else{
                res.status(401).json({success:false});
            }
        }catch(e){
            console.log(e);
            res.status(500).json({success:false})
        }
    }

    public async verify(req:Request,res:Response){
        const {authorization} = req.headers;
        const token = authorization && authorization.split(" ")[1];
        if(token){
            res.status(200).json({user:req.currentUser});
        }
    }

    public async refreshToken(req:Request,res:Response){
        const {refresh_token} = req.cookies;
        if(refresh_token && await JWT.Verify(refresh_token)) {
            res.status(200).json({access_token: await JWT.Sign(2)})
        } else {
            res.status(401).json({success:false});
        }
    }
}