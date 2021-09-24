import { Test, TestingModule } from '@nestjs/testing';
import { userFactory, userProjectFactory } from '../../../test/factories/user.factory';
import { PrismaModule } from '../../modules/prisma.module';
import { UserModule } from '../../modules/user.module';
import { UserService } from '../../services/user.service';
import { UserResolver } from '../user.resolver';

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, PrismaModule],
      providers: [UserResolver, UserService],
    }).compile();
    userResolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
   });

  it('should be defined', () => {
    expect(userResolver).toBeDefined();
  });
  describe('user', () => {
    it('should return user with id when exist', async () => {
      const user = userFactory.build();
      jest.spyOn(userService, 'findOneById').mockResolvedValueOnce(user);
      const result = await userResolver.user(user);
      expect(result).toBe(user);
    });
    it('should return user with id when exist', async () => {
      const user = userFactory.build();
      jest.spyOn(userService, 'findOneById').mockResolvedValueOnce(null);
      const result = await userResolver.user(null);
      expect(result).toBeNull();
    });
  });
  describe('userProject', () => {
    it('should return user with id when exist', async () => {
      const user = userFactory.build();
      jest.spyOn(userService, 'findOneById').mockResolvedValueOnce(user);
      const result = await userResolver.user(user);
      expect(result).toBe(user);
    });
    it('should return user with id when exist', async () => {
      const user = userFactory.build();
      const userProject = userProjectFactory.buildList(3)
      jest.spyOn(userService, 'findAllProject').mockResolvedValueOnce(userProject);
      const result = await userResolver.userProject(user);
      expect(result).toBeNull();
    });
  });
});
