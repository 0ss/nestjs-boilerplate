import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean } from 'class-validator';

@InputType()
export class UpdateFeedbackInput {
  @Field()
  id: string;

  @Field()
  @IsBoolean()
  archived: boolean;
}
