import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../modules/prisma.module';
import { FeedbackService } from '../feedback.service';

describe('FeedbackService', () => {
  let feedbackservice: FeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [FeedbackService],
    }).compile();
    feedbackservice = module.get<FeedbackService>(FeedbackService);
  });
  jest;

  it('should be defined', () => {
    console.log(jest.spyOn(feedbackservice, 'findAll'));
    expect(feedbackservice).toBeDefined();
  });

  describe('findAll', () => {
    const result = ['test'];
    jest.spyOn(feedbackservice, 'findAll').getMockImplementation();
  });
});
