import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare as comparePassword } from 'bcrypt';
import { LoginUserInput } from 'src/dto/login-user.input';
import { RegisterSocialInput } from 'src/dto/register-social.input';
import { RegisterUserInput } from 'src/dto/register-user.input';
import { User } from 'src/entities/user.entity';
import { tomorrow } from 'src/utils/tomorrow';
import { v4 as uuid } from 'uuid';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async validateCredentials(loginUserInput: LoginUserInput): Promise<User> {
    const user = await this.userService.findOneByEmail(loginUserInput.email);

    if (!(await comparePassword(user.password, loginUserInput.password))) {
      throw new UnauthorizedException('credentials are not valid');
    }
    return user;
  }

  async loginSocial(socialId: string): Promise<User> {
    const user = await this.userService.findOneBySocialId(socialId);
    if (!user) throw new UnauthorizedException('Email is not registerd');

    return user;
  }

  async registerUser(registerUserInput: RegisterUserInput): Promise<User> {
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
    return this.jwtService.sign(user);
  }

  verifyToken(token): Partial<User> {
    return this.jwtService.verify(token);
  }
}
