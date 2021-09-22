import { Module } from '@nestjs/common';
import { FeedbackController } from '../controllers/feedback.controller';
import { FeedbackResolver } from '../resolvers/feedback.resolver';
import { FeedbackService } from '../services/feedback.service';
import { UserProjectModule } from './user-project.module';

@Module({
  imports:[UserProjectModule],
  controllers: [FeedbackController],
  providers: [FeedbackResolver, FeedbackService],
})
export class FeedbackModule {}
