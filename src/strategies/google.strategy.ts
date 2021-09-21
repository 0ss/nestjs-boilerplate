import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  // async validate(_, __, profile: Profile, done: VerifyCallback): Promise<any> {
  //   const { id, displayName, emails } = profile;
  //   const oauthId = id;
  //   const name = displayName;
  //   const oauthProvider = 'google';
  //   const email = emails?.[0].value as string;

  //   const user = await this.userService.findOne(_, email);
  //   delete user.password;

  //   if (!user) {
  //     const userWithToken = await this.userService.socialSignUser({
  //       oauthId,
  //       oauthProvider,
  //       email,
  //       name,
  //     });
  //     done(null,userWithToken)
  //   }
  //   if (!user.oauth_id) {
  //       const userWithToken = await this.userService.updateUser(
  //       {
  //         email,
  //       },
  //       {
  //         oauthProvider,
  //         oauthId,
  //       },
  //     );
  //     done(null,userWithToken)

  //   }
  //   const userWithToken =  this.authService.createToken({
  //       ...user
  //   })
  //   done(null, userWithToken);
  // }
}
