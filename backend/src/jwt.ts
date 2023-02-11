import { SignJWT, jwtVerify, JWTPayload, JWTVerifyResult } from "jose";
import {jwtSecret} from './config'

export class JWT {
    static secret = new TextEncoder().encode(jwtSecret);

    public static async Sign(numberOfHours:number, payload: JWTPayload = {}){
        return new SignJWT({...payload})
            .setProtectedHeader({alg: 'HS256'})
            .setIssuedAt()
            .setExpirationTime(`${numberOfHours}h`)
            .sign(this.secret);
    }

    public static Decode(jwt:string): Promise<JWTVerifyResult>{
        return jwtVerify(jwt, this.secret);
    }

    public static async Verify(jwt:string):Promise<boolean>{
        try{
            await this.Decode(jwt);
            return true
        }catch(e){
            return false
        }
    }
}
