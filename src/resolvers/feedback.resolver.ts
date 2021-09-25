import { User } from '.prisma/client';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FeedbackArgs } from '../dto/feedback.args';
import { UpdateFeedbackInput } from '../dto/update-feedback.input';
import { Project } from '../entities/project.entity';
import { Source } from '../entities/source.entity';
import { CurrentUser } from '../decorators/currentuser.decorator';
import { Feedback } from '../entities/feedback.entity';
import { FeedbackService } from '../services/feedback.service';
import { UserService } from '../services/user.service';
import { AuthenticationGuard } from '../guards/authentication.guard';

@Resolver(() => Feedback)
export class FeedbackResolver {
  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthenticationGuard)
  @Query(() => [Feedback])
  async feedback(
    @CurrentUser() user: User,
    @Args('projectId') projectId: string,
  ): Promise<Feedback[]> {
    const hasProject = (await this.userService.findAllProject(user?.id)).some(
      (_) => _.project.id === projectId,
    );
    if (!hasProject)
      throw new UnauthorizedException('You are not allowed view the feedbacks');

    return await this.feedbackService.findAll(projectId);
  }

  @UseGuards(AuthenticationGuard)
  @Mutation(() => Feedback)
  async updateFeedback(
    @CurrentUser() user: User,
    @Args('updateFeedbackInput') updateFeedbackInput: UpdateFeedbackInput,
  ): Promise<Feedback> {
    const feedbackProject = await this.feedbackService.findProject(
      updateFeedbackInput?.id,
    );

    const hasProject = (await this.userService.findAllProject(user?.id)).some(
      (_) => _.project.id === feedbackProject.id,
    );
    if (!hasProject)
      throw new UnauthorizedException(
        'You are not allowed to edit the feedback',
      );

    return await this.feedbackService.update(updateFeedbackInput);
  }
  @ResolveField(() => Source)
  async source(@Parent() feedback: Feedback): Promise<Source> {
    return await this.feedbackService.findSource(feedback.id);
  }
}
