import { Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginUserInput } from '../dto/login-user.input';
import { RegisterSocialInput } from '../dto/register-social.input';
import { RegisterUserInput } from '../dto/register-user.input';
import { UserToken } from '../entities/usertoken.entity';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly projectService: ProjectService,
  ) {}

  private readonly logger = new Logger(AuthResolver.name);
  // after user register to the app we will automaticlly create project for them
  // so they can have a test project
  @Mutation(() => UserToken)
  async register(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ): Promise<UserToken> {
    const user = await this.authService.register(registerUserInput);
    const token = await this.authService.createToken(user);
    await this.projectService.create(
      {
        name: 'Project Test',
      },
      user.id,
    );
    return { token, user };
  }

  @Mutation(() => UserToken)
  async registerSocial(
    @Args('registerSocialInput') registerSocialInput: RegisterSocialInput,
  ): Promise<UserToken> {
    const user = await this.authService.registerSocial(registerSocialInput);
    const token = await this.authService.createToken(user);
    await this.projectService.create(
      {
        name: 'Project Test',
      },
      user.id,
    );
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
