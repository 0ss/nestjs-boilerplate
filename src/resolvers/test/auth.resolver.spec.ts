import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  projectFactory,
  registerSocialInputFactory,
} from '../../../test/factories/project.factory';
import {
  loginUserInputFactory,
  registerUserInputFactory,
  userFactory,
} from '../../../test/factories/user.factory';
import { PrismaModule } from '../../modules/prisma.module';
import { UserModule } from '../../modules/user.module';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { AuthResolver } from '../auth.resolver';

describe('AuthResolver', () => {
  let authResolver: AuthResolver;
  let authService: AuthService;
  let projectService: ProjectService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, PrismaModule],
      providers: [AuthResolver, AuthService, ProjectService],
    }).compile();

    authResolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<AuthService>(AuthService);
    projectService = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(authResolver).toBeDefined();
  });
  describe('register', () => {
    it('should register user and return object of the token with user ', async () => {
      const registerUserInput = registerUserInputFactory.build();
      const user = userFactory.build(registerUserInput);
      const token = authService.createToken(user);
      const project = projectFactory.build();
      jest.spyOn(authService, 'register').mockResolvedValueOnce(user);
      jest.spyOn(authService, 'createToken').mockReturnValueOnce(token);
      jest.spyOn(projectService, 'create').mockResolvedValueOnce(project);

      const result = await authResolver.register(registerUserInput);
      expect(result).toMatchObject({ user, token });
    });
  });
  describe('registerSocial', () => {
    it('should register user from social and return object of the token with user ', async () => {
      const registerSocialInput = registerSocialInputFactory.build();
      const user = userFactory.build(registerSocialInput);
      const token = authService.createToken(user);
      const project = projectFactory.build();
      jest.spyOn(authService, 'registerSocial').mockResolvedValueOnce(user);
      jest.spyOn(authService, 'createToken').mockReturnValueOnce(token);
      jest.spyOn(projectService, 'create').mockResolvedValueOnce(project);

      const result = await authResolver.registerSocial(registerSocialInput);
      expect(result).toMatchObject({ user, token });
    });
  });
  describe('login', () => {
    it('should validate credentials login user ', async () => {
      const loginUserInput = loginUserInputFactory.build();
      const user = userFactory.build(loginUserInput);
      const token = authService.createToken(user);
      jest
        .spyOn(authService, 'validateCredentials')
        .mockResolvedValueOnce(user);
      jest.spyOn(authService, 'createToken').mockReturnValueOnce(token);

      const result = await authResolver.login(loginUserInput);
      expect(result).toMatchObject({ user, token });
    });
    it('should throw an error when failing to validate credentials ', async () => {
      const loginUserInput = loginUserInputFactory.build();
      const user = userFactory.build();
      jest
        .spyOn(authService, 'validateCredentials')
        .mockRejectedValueOnce(new UnauthorizedException());
      await expect(async () => {
        await authResolver.login(loginUserInput);
      }).rejects.toThrow(UnauthorizedException);
    });
  });
  describe('loginSocial', () => {
    it('should login user from social ', async () => {
      const email = 'email@email.com';
      const user = userFactory.build({ email });
      const token = authService.createToken(user);
      jest.spyOn(authService, 'loginSocial').mockResolvedValueOnce(user);
      jest.spyOn(authService, 'createToken').mockReturnValueOnce(token);
      const result = await authResolver.loginSocial(email);
      expect(result).toMatchObject({ user, token });
    });

    it('should throw an error when social login id is not registerd', async () => {
      const email = 'email@email.com';
      const user = userFactory.build();
      jest
        .spyOn(authService, 'loginSocial')
        .mockRejectedValueOnce(new UnauthorizedException());

      await expect(async () => {
        await authResolver.loginSocial(email);
      }).rejects.toThrow(UnauthorizedException);
    });
  });
  describe('resetPassword', () => {
    it('should return true when creating reset password token ', async () => {
      const email = 'email@email.com';
      jest
        .spyOn(authService, 'createResetPasswordToken')
        .mockResolvedValueOnce(true);
      const result = await authResolver.resetPassword(email);
      expect(result).toBeTruthy();
    });
  });
});
