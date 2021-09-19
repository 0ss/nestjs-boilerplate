import { Test, TestingModule } from '@nestjs/testing';
import {
  registerUserInputFactory,
  userFactory
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
      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValue(user);
      const result = await userService.create(userRegisterInput);
      expect(result).toEqual(user);
    });
  });

  describe('findOneByEmail', () => {
    it('should return null when email is null or undefined', async () => {
      const shouldNull = await userService.findOneByEmail(null);
      const shouldUndefined = await userService.findOneByEmail(undefined);
      expect(shouldNull).toBeNull();
      expect(shouldUndefined).toBeNull();
    });
    it('should return user with given email', async () => {
      const user = userFactory.build()
      jest.spyOn(prismaService.user,'findFirst').mockResolvedValue(user)
      const result = await userService.findOneByEmail(user.email)
      expect(result).toBe(user)
    })
  });

  describe('findOneById', () => {
    it('should return null when email is null or undefined', async () => {
      const shouldNull = await userService.findOneById(null);
      const shouldUndefined = await userService.findOneById(undefined);
      expect(shouldNull).toBeNull();
      expect(shouldUndefined).toBeNull();
    });
    it('should return user with given id', async () => {
      const user = userFactory.build()
      jest.spyOn(prismaService.user,'findFirst').mockResolvedValue(user)
      const result = await userService.findOneByEmail(user.id)
      expect(result).toBe(user)
    })
  });

  describe('findOneBySocialId', () => {
    it('should return null when email is null or undefined', async () => {
      const shouldNull = await userService.findOneBySocialId(null);
      const shouldUndefined = await userService.findOneById(undefined);
      expect(shouldNull).toBeNull();
      expect(shouldUndefined).toBeNull();
    });
    it('should return user with given social id', async () => {
      const user = userFactory.build()
      jest.spyOn(prismaService.user,'findFirst').mockResolvedValue(user)
      const result = await userService.findOneByEmail(user.id)
      expect(result).toBe(user)
    })
  });
});
