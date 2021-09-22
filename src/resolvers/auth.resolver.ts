import { Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { registerUserInputFactory } from '../../test/factories/user.factory';
import { LoginUserInput } from '../dto/login-user.input';
import { RegisterSocialInput } from '../dto/register-social.input';
import { RegisterUserInput } from '../dto/register-user.input';
import { User } from '../entities/user.entity';
import { UserToken } from '../entities/usertoken.entity';
import { AuthService } from '../services/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  private readonly logger = new Logger(AuthResolver.name);

  @Mutation(() => UserToken)
  async register(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ): Promise<UserToken> {
    const user = await this.authService.registerUser(registerUserInput);
    const token = await this.authService.createToken(user);
    return { token, user };
  }

  @Mutation(() => UserToken)
  async registerSocial(
    @Args('registerSocialInput') registerSocialInput: RegisterSocialInput,
  ): Promise<UserToken> {
    const user = await this.authService.registerSocial(registerSocialInput);
    const token = await this.authService.createToken(user);
    return { token, user };
  }

  @Mutation(() => UserToken)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<UserToken> {
    const user = await this.authService.validateCredentials(loginUserInput);
    const token = await this.authService.createToken(user);
    return { token, user };
  }

  @Mutation(() => Boolean)
  async resetPassword(@Args('email') email: string): Promise<boolean> {
    return await this.authService.createResetPasswordToken(email);
  }
}
