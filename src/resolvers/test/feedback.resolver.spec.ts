import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackResolver } from '../feedback.resolver';
import { FeedbackService } from '../../services/feedback.service';

describe('FeedbackResolver', () => {
  let resolver: FeedbackResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackResolver, FeedbackService],
    }).compile();

    resolver = module.get<FeedbackResolver>(FeedbackResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
