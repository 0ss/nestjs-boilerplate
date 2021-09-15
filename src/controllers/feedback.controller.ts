/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post } from '@nestjs/common';
import { CreateFeedbackInput } from 'src/dto/create-feedback.input';
import { FeedbackService } from 'src/services/feedback.service';

@Controller()
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('/cfeedback')
  async collectFeedback(
    createFeedbackInput: CreateFeedbackInput,
  ) {
    console.log('ee')
    const success = await this.feedbackService.create(createFeedbackInput);
    return {
        success
    }
  }
}
