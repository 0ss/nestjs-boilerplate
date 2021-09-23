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
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRATION_TIME'),
          },
        };
      },
      inject: [ConfigService],
      imports:[ConfigModule]
    }),
  ],
  providers: [AuthService, AuthResolver, GoogleStrategy, AuthenticationGuard],
  exports: [AuthService, PassportModule, AuthenticationGuard ],
})
export class AuthModule {}
