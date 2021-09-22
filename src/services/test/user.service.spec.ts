import { Test, TestingModule } from '@nestjs/testing';
import {
  registerSocialInputFactory,
  registerUserInputFactory,
  userFactory,
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
});
