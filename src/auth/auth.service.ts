import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService,) { }
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        try {
            const { username, password } = authCredentialsDto;
            // hash password 
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt)
            const user = this.usersRepository.create({ username, password: hashedPassword });
            await this.usersRepository.save(user);
        } catch (error) {
            throw new ConflictException('username duplication');
        }
    }
    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;
        const user = await this.usersRepository.findOneBy({ username: username });
        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken: string = await this.jwtService.sign({ username })
            return { accessToken }
        }
        else throw new UnauthorizedException('Login failed by either username or password');

    }
}
