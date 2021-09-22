import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import {
  loginUserInputFactory,
  userFactory,
} from '../../../test/factories/user.factory';
import { EmailModule } from '../../modules/email.module';
import { PrismaModule } from '../../modules/prisma.module';
import { UserModule } from '../../modules/user.module';
import { AuthService } from '../auth.service';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let prismaService: PrismaService;
  const configService = new ConfigService();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRATION_TIME'),
          },
        }),
      ],
      providers: [AuthService, UserService, PrismaService, ConfigService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(AuthService).toBeDefined();
  });

  describe('validateCredentials', () => {
    it('it should return true on true credentials', async () => {
      const loginUserInput = loginUserInputFactory.build();
      const user = userFactory.build(loginUserInput);
      jest.spyOn(userService, 'findOneByEmail').mockRejectedValueOnce(user);
      const result = authService.validateCredentials(loginUserInput);
      console.log(result);
      expect(result).toBe(user);
    });
  });
});
