import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategies } from './jwt.strategies';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: 'topSecret51', signOptions: {
      expiresIn: 36000
    },
  })
  ],
  providers: [AuthService, JwtStrategies],
  controllers: [AuthController],
  exports: [JwtStrategies, PassportModule]
})
export class AuthModule { }
