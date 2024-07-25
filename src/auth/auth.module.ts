import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JwtKey,
      signOptions: {expiresIn: '5h'},
    }),
  ],
  // providers: [AuthService, JwT],
  controllers: [AuthController],
})
export class AuthModule {}
