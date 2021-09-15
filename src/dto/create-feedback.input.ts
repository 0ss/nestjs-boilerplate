import { Field, InputType } from '@nestjs/graphql';
import { FeedbackEmoji } from 'src/enums/feedback-emoji.enum';
import { FeedbackType } from 'src/enums/feedback-type.enum';

@InputType()
export class CreateFeedbackInput {
  @Field()
  projectId: string

  @Field()
  type : FeedbackType

  @Field()
  emoji? : FeedbackEmoji

  @Field()
  content: string

  @Field()
  page: string

  @Field()
  metadata: string
}
