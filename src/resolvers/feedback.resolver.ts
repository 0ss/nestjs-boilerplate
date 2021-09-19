import { User } from '.prisma/client';
import { UnauthorizedException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FeedbackArgs } from 'src/dto/feedback.args';
import { UpdateFeedbackInput } from 'src/dto/update-feedback.input';
import { Project } from 'src/entities/project.entity';
import { Source } from 'src/entities/source.entity';
import { CurrentUser } from '../decorators/currentuser.decorator';
import { Feedback } from '../entities/feedback.entity';
import { FeedbackService } from '../services/feedback.service';
import { UserProjectService } from '../services/user-project.service';

@Resolver(() => Feedback)
export class FeedbackResolver {
  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly userProjectService: UserProjectService,
  ) {}

  @Query(() => [Feedback])
  async feedback(@Args() feedbackArgs: FeedbackArgs): Promise<Feedback[]> {
    const hasProject = (await this.userProjectService.findAll(user?.id)).some(
      (_) => _.project.id === feedbackArgs.projectId,
    );
    if (!hasProject)
      throw new UnauthorizedException(
        'You are not allowed to edit the feedback',
      );

    return await this.feedbackService.findAll(feedbackArgs);
  }

  @Mutation(() => Feedback)
  async updateFeedback(
    @CurrentUser() user: User,
    @Args('updateFeedbackInput') updateFeedbackInput: UpdateFeedbackInput,
  ): Promise<Feedback> {
    const feedbackProject = await this.feedbackService.findProject(
      updateFeedbackInput?.id,
    );

    const hasProject = (await this.userProjectService.findAll(user?.id)).some(
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

  @ResolveField(() => Source)
  async project(@Parent() feedback: Feedback): Promise<Project> {
    return await this.feedbackService.findProject(feedback.id);
  }
}
