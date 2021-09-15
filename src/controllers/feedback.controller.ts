/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, Req } from '@nestjs/common';
import { CreateFeedbackInput } from 'src/dto/create-feedback.input';
import { FeedbackService } from 'src/services/feedback.service';
import { getReqSource } from 'src/utils/get-req-source';

@Controller()
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('/collect-feedback')
  async collectFeedback(
    @Req() req: Request,
    createFeedbackInput: CreateFeedbackInput,
  ) {
    const source = getReqSource(req);
    const success = await this.feedbackService.create(
      createFeedbackInput,
      source,
    );
    return {
      success,
    };
  }
}
