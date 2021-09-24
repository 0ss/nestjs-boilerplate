import { Module } from '@nestjs/common';
import { FeedbackController } from '../controllers/feedback.controller';
import { FeedbackResolver } from '../resolvers/feedback.resolver';
import { FeedbackService } from '../services/feedback.service';
import { UserModule } from './user.module';

@Module({
  imports:[UserModule],
  controllers: [FeedbackController],
  providers: [FeedbackResolver, FeedbackService],
})
export class FeedbackModule {}
