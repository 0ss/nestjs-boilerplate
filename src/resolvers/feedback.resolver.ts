import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { FeedbackArgs } from 'src/dto/feedback.args';
import { UpdateFeedbackInput } from 'src/dto/update-feedback.input';
import { Project } from 'src/entities/project.entity';
import { Source } from 'src/entities/source.entity';
import { Feedback } from '../entities/feedback.entity';
import { FeedbackService } from '../services/feedback.service';

@Resolver(() => Feedback)
export class FeedbackResolver {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Query(() => [Feedback])
  async feedback(@Args() feedbackArgs: FeedbackArgs): Promise<Feedback[]> {
    return await this.feedbackService.findAll(feedbackArgs);
  }

  @Mutation(() => Feedback)
  async updateFeedback(@Args('updateFeedbackInput') updateFeedbackInput: UpdateFeedbackInput): Promise<Feedback> {
    return await this.feedbackService.update(updateFeedbackInput)
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
