import { NextFunction, Request, Response } from "express";
import { User } from "../Entities/User";
import { JWT } from "../jwt";
import MUUID from 'uuid-mongodb';

export const auth = async (req:Request,res:Response,next:NextFunction) => {
    const bearerHeader = req.headers.authorization;
    const token = bearerHeader && bearerHeader.split(" ")[1];
    if(token && await JWT.Verify(token)) {
        const decoded = (await JWT.Decode(token)).payload;
        const user = await User.findById(MUUID.from(decoded.user as string)).exec();
        if(user){
            req.currentUser = user;
            next();
        }else{
            console.log('User does not exist');
            res.status(500).json({success:false});
        }
    } else {
        res.status(401).json({success:false});
    }
}