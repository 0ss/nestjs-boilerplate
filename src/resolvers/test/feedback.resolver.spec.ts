import { Test, TestingModule } from '@nestjs/testing';
import { feedbackFactory } from '../../../test/factories/feedback.factory';
import { PrismaModule } from '../../modules/prisma.module';
import { UserModule } from '../../modules/user.module';
import { FeedbackService } from '../../services/feedback.service';
import { UserService } from '../../services/user.service';
import { FeedbackResolver } from '../feedback.resolver';

describe('FeedbackResolver', () => {
  let feedbackResolver: FeedbackResolver;
  let feedbackService: FeedbackService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[UserModule,PrismaModule],
      providers: [FeedbackResolver, FeedbackService, ],
    }).compile();

    feedbackResolver = module.get<FeedbackResolver>(FeedbackResolver);
    feedbackService = module.get<FeedbackService>(FeedbackService);
    userService = module.get<UserService>(UserService);

  });

  it('should be defined', () => {
    expect(feedbackResolver).toBeDefined();
  });
 
});
