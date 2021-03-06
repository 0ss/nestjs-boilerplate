import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { compare as comparePassword } from 'bcrypt';
import { LoginUserInput } from '../dto/login-user.input';
import { RegisterSocialInput } from '../dto/register-social.input';
import { RegisterUserInput } from '../dto/register-user.input';
import { User } from '../entities/user.entity';
import { tomorrow } from '../utils/tomorrow';
import { v4 as uuid } from 'uuid';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { jwt } from '../utils/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async validateCredentials(loginUserInput: LoginUserInput): Promise<User> {
    const user = await this.userService.findOneByEmail(loginUserInput.email);

    if (!(await comparePassword(loginUserInput.password, user.password))) {
      throw new UnauthorizedException('credentials are not valid');
    }
    return user;
  }

  async loginSocial(socialId: string): Promise<User> {
    const user = await this.userService.findOneBySocialId(socialId);
    if (!user) throw new UnauthorizedException('Account is not registered');

    return user;
  }

  async register(registerUserInput: RegisterUserInput): Promise<User> {
    if (!!(await this.userService.findOneByEmail(registerUserInput.email)))
      throw new ConflictException('Email already registered');

    const user = await this.userService.create(registerUserInput);
    return user;
  }

  async registerSocial(
    registerSocialInput: RegisterSocialInput,
  ): Promise<User> {
    if (
      !!(await this.userService.findOneBySocialId(registerSocialInput.socialId))
    )
      throw new ConflictException('Email already registered');

    const user = await this.userService.createWithSocial(registerSocialInput);
    return user;
  }

  async createResetPasswordToken(email: string): Promise<boolean> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) return true;
    await this.prismaService.resetPasswordToken.create({
      data: {
        id: uuid(),
        userId: user.id,
        token: uuid(),
        expirationDate: tomorrow(),
      },
    });
    return true;
  }

  createToken(user: Partial<User>): string {
    delete user.password;
    return jwt.sign(user);
  }

  verifyToken(token : string): Partial<User> {
    return jwt.verify(token) as Partial<User>
  }
}
