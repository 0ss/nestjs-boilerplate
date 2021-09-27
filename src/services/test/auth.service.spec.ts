import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { hashSync } from 'bcrypt';
import {
  loginUserInputFactory,
  registerSocialInputFactory,
  resetPasswordTokenFactory,
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
      }).rejects.toThrow(UnauthorizedException);
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
      }).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('registerSocial', () => {
    it('should register user from social', async () => {
      const registerSocialInput = registerSocialInputFactory.build();
      const user = userFactory.build(registerSocialInput);
      jest.spyOn(userService, 'findOneBySocialId').mockResolvedValueOnce(null);
      jest.spyOn(userService, 'createWithSocial').mockResolvedValueOnce(user);
      const result = await authService.registerSocial(registerSocialInput);
      expect(result).toBe(user);
    });

    it('should throw if social is already registered', async () => {
      const registerSocialInput = registerSocialInputFactory.build();
      const user = userFactory.build(registerSocialInput);
      jest.spyOn(userService, 'findOneBySocialId').mockResolvedValueOnce(user);
      await expect(async () => {
        await authService.registerSocial(registerSocialInput);
      }).rejects.toThrow('Email already registered');
    });
  });
  describe('createResetPasswordToken', () => {
    it('should return true even when email does not exist', async () => {
      const user = userFactory.build();
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValueOnce(null);
      const result = await authService.createResetPasswordToken(user.email);
      expect(result).toBeTruthy();
    });

    it('should return true even when email exist and token sent', async () => {
      const user = userFactory.build();
      const resetPasswordToken = resetPasswordTokenFactory.build();
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValueOnce(user);
      jest
        .spyOn(prismaService.resetPasswordToken, 'create')
        .mockResolvedValueOnce(resetPasswordToken);
      const result = await authService.createResetPasswordToken(user.email);
      expect(result).toBeTruthy();
    });
  });
  describe('createToken', () => {
    it('should create new JWT token', async () => {
      const user = userFactory.build();
      const result = await authService.createToken(user);
      expect(result).toBeTruthy();
    });
  });
  describe('verifyToken', () => {
    it('should return true when token is valid', async () => {
      const user = userFactory.build();
      const token = await authService.createToken(user);
      const result = await authService.verifyToken(token);
      expect(result).toBeTruthy();
    });
    it('should throw when token is not valid', async () => {
      const user = userFactory.build();
      const token = await authService.createToken(user);
      await expect(async () => {
        await authService.verifyToken(token + 'blah');
      }).rejects.toThrow('invalid signature');
    });
  });
});
