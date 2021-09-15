import { MinLength, IsPositive } from 'class-validator';
import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class FeedbackArgs {
  @Field()
  projectId?: string;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  skip?: number;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  take?: number;
}
