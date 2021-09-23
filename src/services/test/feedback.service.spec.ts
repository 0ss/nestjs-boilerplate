import { Test, TestingModule } from '@nestjs/testing';
import {
  createFeedbackInputFactory,
  feedbackFactory,
  sourceFactory,
  updateFeedbackInputFactory,
} from '../../../test/factories/feedback.factory';
import { PrismaModule } from '../../modules/prisma.module';
import { FeedbackService } from '../feedback.service';
import { PrismaService } from '../prisma.service';
import { v4 as uuid } from 'uuid';
describe('FeedbackService', () => {
  let feedbackservice: FeedbackService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [FeedbackService],
    }).compile();
    feedbackservice = module.get<FeedbackService>(FeedbackService);
    prismaService = module.get<PrismaService>(PrismaService);
  });
  jest;

  it('should be defined', () => {
    expect(feedbackservice).toBeDefined();
  });

  describe('findAll', () => {
    it('should find all feedback with given projectId', async () => {
      const projectId = uuid();
      const feedbacks = feedbackFactory.buildList(30, {
        projectId,
        project: {
          id: projectId,
        },
      });

      jest
        .spyOn(prismaService.feedback, 'findMany')
        .mockResolvedValueOnce(feedbacks);
      const result = await feedbackservice.findAll(uuid);
      expect(result).toEqual(feedbacks);
      result.forEach((e) => {
        expect(e.projectId).toEqual(projectId);
      });
    });
    it('should return null when projectId is null or undefined', async () => {
      const invalid = await feedbackservice.findAll(undefined);
      expect(invalid).toHaveLength(0);
    });
  });
  describe('create', () => {
    it('should create new feedback and return true no matter what', async () => {
      const createFeedbackInput = createFeedbackInputFactory.build();
      const feedback = feedbackFactory.build();
      const source = sourceFactory.build();
      jest.spyOn(prismaService.source, 'create').mockResolvedValueOnce(source);
      const result = await feedbackservice.create(createFeedbackInput, source);
      expect(result).toEqual(true);
    });
  });
  describe('update', () => {
    it('should return null when id is null or undefined', async () => {
      const updateFeedbackInput = updateFeedbackInputFactory.build({id: undefined})
      const invalid = await feedbackservice.update(updateFeedbackInput);
      expect(invalid).toBeNull();
    });

    it('should update feedback', async () => {
      const updateFeedbackInput = updateFeedbackInputFactory.build()
      const feedback = feedbackFactory.build(updateFeedbackInput);
      const source = sourceFactory.build();
      jest.spyOn(prismaService.feedback, 'update').mockResolvedValueOnce(feedback);
      const result = await feedbackservice.update(updateFeedbackInput);
      expect(result).toEqual(feedback);
    });
  });
  describe('findSource', () => {
    it('should return null when feedbackId is null or undefined', async () => {
      const invalid = await feedbackservice.findSource(undefined);
      expect(invalid).toBeNull();
    });
    it('should return the feedback source', async () => {
      const source = sourceFactory.build();
      const feedback = feedbackFactory.build({ sourceId: source.id, source });
      jest
        .spyOn(prismaService.source, 'findFirst')
        .mockResolvedValueOnce(source);
      const result = await feedbackservice.findSource(feedback.id);
      expect(result).toEqual(source);
    });
  });
});
