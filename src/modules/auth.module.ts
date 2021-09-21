/*
https://docs.nestjs.com/modules
*/
import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from '../resolvers/auth.resolver';
import { GoogleStrategy } from '../strategies/google.strategy';
import { AuthService } from './../services/auth.service';
import { UserModule } from './user.module';


@Module({
  imports: [
    PassportModule,
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
    }),
  ],
  providers: [AuthService,AuthResolver,GoogleStrategy, ],
  exports: [AuthService,PassportModule],
})
export class AuthModule {}
