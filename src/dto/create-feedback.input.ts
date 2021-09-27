import { Field, InputType } from '@nestjs/graphql';
import { FeedbackEmoji } from '../enums/feedback-emoji.enum';
import { FeedbackType } from '../enums/feedback-type.enum';

@InputType()
export class CreateFeedbackInput {
  @Field()
  projectId: string;

  @Field({ defaultValue: 'issue' })
  type: FeedbackType = FeedbackType.issue;

  @Field({ defaultValue: null })
  emoji?: FeedbackEmoji = null;

  @Field()
  content: string;

  @Field()
  page: string;

  @Field()
  metadata: string;
}
