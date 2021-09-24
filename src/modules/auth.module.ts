/*
https://docs.nestjs.com/modules
*/
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { AuthResolver } from '../resolvers/auth.resolver';
import { GoogleStrategy } from '../strategies/google.strategy';
import { AuthService } from './../services/auth.service';
import { EmailModule } from './email.module';
import { ProjectModule } from './project.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    PassportModule,
    ProjectModule,
    EmailModule,
    ConfigModule,
    AuthenticationGuard,
    UserModule,
  ],
  providers: [AuthService, AuthResolver, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
