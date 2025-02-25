import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConfig } from './config/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory :  jwtConfig,
      inject: [ConfigService],
    }),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
