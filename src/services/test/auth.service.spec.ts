import { Test, TestingModule } from '@nestjs/testing';
import {
  registerSocialInputFactory,
  registerUserInputFactory,
  userFactory
} from '../../../test/factories/user.factory';
import { PrismaModule } from '../../modules/prisma.module';
import { AuthService } from '../auth.service';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user.service';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);

  });

  it('should be defined', () => {
    expect(AuthService).toBeDefined();
  });

  describe('', () => {
    it('', async () => {
       
    });
  });
 
});
