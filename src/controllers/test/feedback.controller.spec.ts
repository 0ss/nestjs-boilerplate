import { Test, TestingModule } from '@nestjs/testing';
import { CreateFeedbackInput } from '../../dto/create-feedback.input';
import { AppService } from '../../services/app.service';
import { FeedbackService } from '../../services/feedback.service';
import { PrismaService } from '../../services/prisma.service';
import { FeedbackController } from '../feedback.controller';

describe('FeedbackController', () => {
  let feedbackController: FeedbackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackController],
      providers: [FeedbackService, PrismaService, AppService],
    }).compile();

    feedbackController = module.get<FeedbackController>(FeedbackController);
  });

  describe('collectFeedback', () => {
    it('should return success true when creating feedback', () => {
        const feedback = new CreateFeedbackInput()
        console.log('asd',feedback.type)
      expect(FeedbackController).toBeDefined()
    });
  });
});
