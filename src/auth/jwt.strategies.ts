import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategies extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,) {
        super({
            secretOrKey: 'topSecret51',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }
    async validate(payload: any): Promise<User> {
        const { username } = payload;
        const user: User = await this.usersRepository.findOneBy({ username: username })
        if (!user) throw new UnauthorizedException('failed to verify user')
        return user;
    }
}
