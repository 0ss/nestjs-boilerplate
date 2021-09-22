import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { hashSync } from 'bcrypt';
import {
  loginUserInputFactory,
  registerSocialInputFactory,
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
    it('should return true on true credentials', async () => {
      const loginUserInput = loginUserInputFactory.build();
      const user = userFactory.build({
        ...loginUserInput,
        password: hashSync(loginUserInput.password, 10),
      });
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValueOnce(user);
      const result = await authService.validateCredentials(loginUserInput);
      expect(result).toBe(user);
    });
    it('should throw error when credentials not matched', async () => {
      const loginUserInput = loginUserInputFactory.build();
      const user = userFactory.build();
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValueOnce(user);
      await expect(async () => {
        await authService.validateCredentials(loginUserInput);
      }).rejects.toThrow('credentials are not valid');
    });
  });
  describe('loginSocial', () => {
    it('should retun user when found', async () => {
      const user = userFactory.build();
      jest.spyOn(userService, 'findOneBySocialId').mockResolvedValueOnce(user);
      const result = await authService.loginSocial(user.socialId);
      expect(result).toBe(user);
    });

    it('it should throw when user not found', async () => {
      const user = userFactory.build();
      jest.spyOn(userService, 'findOneBySocialId').mockResolvedValueOnce(null);
      await expect(async () => {
        await authService.loginSocial(user.socialId);
      }).rejects.toThrow('Email is not registered');
    });
  });

  describe('registerSocial', () => {
    it('should register user from social', async () => {
      const registerSocialInput = registerSocialInputFactory.build()
      const user = userFactory.build({...registerSocialInput,password:null});
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValueOnce(null);
      jest.spyOn(userService, 'createWithSocial').mockResolvedValueOnce(user);
      const result = await authService.registerSocial(registerSocialInput);
      expect(result).toBe(user);
    });

    it('it should throw when user not found', async () => {
      const user = userFactory.build();
      jest.spyOn(userService, 'findOneBySocialId').mockResolvedValueOnce(null);
      await expect(async () => {
        await authService.loginSocial(user.socialId);
      }).rejects.toThrow('Email is not registered');
    });
  });

});
