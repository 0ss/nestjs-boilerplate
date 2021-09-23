import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from '../user.resolver';
import { UserService } from '../../services/user.service';
import { userFactory } from '../../../test/factories/user.factory';
import { UserProjectService } from '../../services/user-project.service';
import { PrismaService } from '../../services/prisma.service';
import { AuthService } from '../../services/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserProjectModule } from '../../modules/user-project.module';
import { PrismaModule } from '../../modules/prisma.module';
import { AuthModule } from '../../modules/auth.module';
import { ConfigModule } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { UserModule } from '../../modules/user.module';

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let userService: UserService;
  let userProjectService: UserProjectService;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, PrismaModule],
      providers: [UserResolver, UserService, UserProjectService],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    userResolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
    userProjectService = module.get<UserProjectService>(UserProjectService);
  });

  it('should be defined', () => {
    expect(userResolver).toBeDefined();
  });
  describe('user', () => {
    it('should return user with id when exist', async () => {
      const user = userFactory.build();
      const result = await userResolver.user(user);
      jest.spyOn(userService, 'findOneById').mockResolvedValueOnce(user);
      expect(result).toBe(user);
    });
  });
});
