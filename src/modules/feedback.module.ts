import { Module } from '@nestjs/common';
import { FeedbackService } from '../services/feedback.service';
import { FeedbackResolver } from '../resolvers/feedback.resolver';
import { FeedbackController } from '../controllers/feedback.controller';

@Module({
  controllers:[FeedbackController],
  providers: [FeedbackResolver, FeedbackService]
})
export class FeedbackModule {}
