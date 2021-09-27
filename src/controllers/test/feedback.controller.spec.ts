import { Test, TestingModule } from '@nestjs/testing';
import { createFeedbackInputFactory } from '../../../test/factories/feedback.factory';
import { CreateFeedbackInput } from '../../dto/create-feedback.input';
import { AppService } from '../../services/app.service';
import { FeedbackService } from '../../services/feedback.service';
import { PrismaService } from '../../services/prisma.service';
import { FeedbackController } from '../feedback.controller';
import * as mock from 'node-mocks-http';
import * as faker from 'faker'
describe('FeedbackController', () => {
  let feedbackController: FeedbackController;
  let feedbackService: FeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackController],
      providers: [FeedbackService, PrismaService, AppService],
    }).compile();

    feedbackController = module.get<FeedbackController>(FeedbackController);
    feedbackService = module.get<FeedbackService>(FeedbackService);

  });

  describe('collectFeedback', () => {
    it('should return success true when creating feedback', async () => {
      const createFeedbackInput = createFeedbackInputFactory.build();
      jest.spyOn(feedbackService,'create').mockResolvedValueOnce(true)
      const result = await feedbackController.collectFeedback(
        mock.createRequest({
          headers: {
            'user-agent':
              'Mozilla/5.0 (Windows NT 6.2; rv:20.0) Gecko/20121202 Firefox/20.0',
          },
          ip: faker.internet.ip()
        }),
        createFeedbackInput,
      );
      expect(result).toBeDefined();
    });
  });
});
