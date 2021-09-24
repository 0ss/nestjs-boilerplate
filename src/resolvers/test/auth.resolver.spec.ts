import { Test, TestingModule } from '@nestjs/testing';
import { ProjectResolver } from '../project.resolver';
import { ProjectService } from '../../services/project.service';
import { AuthResolver } from '../auth.resolver';
import { AuthService } from '../../services/auth.service';
import { AuthModule } from '../../modules/auth.module';
import { UserService } from '../../services/user.service';
import { UserModule } from '../../modules/user.module';
import { PrismaModule } from '../../modules/prisma.module';

describe('AuthResolver', () => {
  let authResolver: AuthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [UserModule, PrismaModule],
        providers: [AuthResolver, AuthService, ProjectService],
    }).compile();

    authResolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(authResolver).toBeDefined();
  });
});
