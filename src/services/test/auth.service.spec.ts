import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { hashSync } from 'bcrypt';
import {
  loginUserInputFactory,
  userFactory,
} from '../../../test/factories/user.factory';
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
      const user = userFactory.build({
        ...loginUserInput,
        password: hashSync(loginUserInput.password, 10),
      });
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValueOnce(user);
      const result = await authService.validateCredentials(loginUserInput);
      expect(result).toBe(user);
    });
    it('it should throw error when credentials not matched', async () => {
      const loginUserInput = loginUserInputFactory.build();
      const user = userFactory.build();
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValueOnce(user);
      await expect(async () => {
        await authService.validateCredentials(loginUserInput);
      }).rejects.toThrow('credentials are not valid')       
    });
  });
});
