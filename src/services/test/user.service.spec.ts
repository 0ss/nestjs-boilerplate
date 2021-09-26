import { Test, TestingModule } from '@nestjs/testing';
import { projectFactory } from '../../../test/factories/project.factory';
import {
  registerSocialInputFactory,
  registerUserInputFactory,
  userFactory,
  userProjectFactory,
} from '../../../test/factories/user.factory';
import { PrismaModule } from '../../modules/prisma.module';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user.service';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create new user', async () => {
      const userRegisterInput = registerUserInputFactory.build();
      const user = userFactory.build(userRegisterInput);
      jest.spyOn(prismaService.user, 'create').mockResolvedValueOnce(user);
      const result = await userService.create(userRegisterInput);
      expect(result).toEqual(user);
    });
  });

  describe('createWithSocial', () => {
    it('should create new user', async () => {
      const registerSocialInput = registerSocialInputFactory.build();
      const user = userFactory.build(registerSocialInput);
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(user);
      const result = await userService.createWithSocial(registerSocialInput);
      expect(result).toEqual(user);
    });
  });

  describe('findOneByEmail', () => {
    it('should return null when email is null or undefined', async () => {
      const invalid = await userService.findOneByEmail(undefined);
      expect(invalid).toBeNull();
    });
    it('should return user with given email', async () => {
      const user = userFactory.build();
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(user);
      const result = await userService.findOneByEmail(user.email);
      expect(result).toBe(user);
    });
  });

  describe('findOneById', () => {
    it('should return null when email is invalid', async () => {
      const invalid = await userService.findOneById(undefined);
      expect(invalid).toBeNull();
    });
    it('should return user with given id', async () => {
      const user = userFactory.build();
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(user);
      const result = await userService.findOneByEmail(user.id);
      expect(result).toBe(user);
    });
  });

  describe('findOneBySocialId', () => {
    it('should return null when email is null or undefined', async () => {
      const invalid = await userService.findOneBySocialId(undefined);
      expect(invalid).toBeNull();
    });
    it('should return user with given social id', async () => {
      const user = userFactory.build();
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(user);
      const result = await userService.findOneByEmail(user.id);
      expect(result).toBe(user);
    });
  });

  describe('findAllProject', () => {
    it('should return empty array user id is not valid', async () => {
      const invalid = await userService.findOneBySocialId(undefined);
      expect(invalid).toBeNull();
    });
    it('should return all user project', async () => {
      const project = projectFactory.build();
      const user = userFactory.build();
      jest.spyOn(prismaService.userProject, 'findMany').mockResolvedValue([
        {
          projectId: project.id,
          role: 'user',
          userId: user.id,
        },
      ]);
      const result = await userService.findAllProject(user.id);
      expect(result).toBe(result);
    });
    it('should empty array when user does not have projects', async () => {
      const project = projectFactory.build();
      const user = userFactory.build();
      jest.spyOn(prismaService.userProject, 'findMany').mockResolvedValue([]);
      const result = await userService.findAllProject(user.id);
      expect(result).toBe(result);
    });
  });

  describe('hasProjectWithId', () => {
    it('should return null when projectId or userId is null or undefined', async () => {
      const invalid = await userService.hasProjectWithId(undefined, undefined);
      expect(invalid).toBeFalsy();
    });
    it('should return boolean when user hasProjectWithId', async () => {
      const project = projectFactory.build();
      const user = userFactory.build();
      jest.spyOn(prismaService.userProject, 'findFirst').mockResolvedValue({
        projectId: project.id,
        role: 'user',
        userId: user.id,
      });
      const result = await userService.hasProjectWithId(user.id, project.id);
      expect(result).toBeTruthy();
    });
    it('should return boolean when user not hasProjectWithId', async () => {
      const project = projectFactory.build();
      const user = userFactory.build();
      jest
        .spyOn(prismaService.userProject, 'findFirst')
        .mockResolvedValue(null);
      const result = await userService.hasProjectWithId(user.id, project.id);
      expect(result).toBeFalsy();
    });
  });
  describe('adminOfProjectWithId', () => {
    it('should return null when projectId or userId is null or undefined', async () => {
      const invalid = await userService.adminOfProjectWithId(
        undefined,
        undefined,
      );
      expect(invalid).toBeFalsy();
    });
    it('should return boolean when user adminOfProjectWithId', async () => {
      const project = projectFactory.build();
      const user = userFactory.build();
      jest.spyOn(prismaService.userProject, 'findFirst').mockResolvedValue({
        projectId: project.id,
        role: 'admin',
        userId: user.id,
      });
      const result = await userService.adminOfProjectWithId(
        user.id,
        project.id,
      );
      expect(result).toBeTruthy();
    });
    it('should return boolean when user is NOT adminOfProjectWithId', async () => {
      const project = projectFactory.build();
      const user = userFactory.build();
      jest
        .spyOn(prismaService.userProject, 'findFirst')
        .mockResolvedValue(null);
      const result = await userService.adminOfProjectWithId(
        user.id,
        project.id,
      );
      expect(result).toBeFalsy();
    });
  });
});
