/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, Req } from '@nestjs/common';
import { CreateFeedbackInput } from '../dto/create-feedback.input';
import { FeedbackService } from '../services/feedback.service';
import { getReqSource } from '../utils/get-req-source';
import { Request } from 'express';

@Controller()
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('/collect-feedback')
  async collectFeedback(
    @Req() req: Request,
    createFeedbackInput: CreateFeedbackInput,
  ) {
    const source = getReqSource(req);
    console.log(source)
    const success = await this.feedbackService.create(
      createFeedbackInput,
      source,
    );
    return {
      success,
    };
  }
}
