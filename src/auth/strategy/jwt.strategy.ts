import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwTStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super ({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.Jwt_Key,
        })
    }
    async validate(payload: any){
        return {userId: payload.sub, username:payload.username};
    }
}