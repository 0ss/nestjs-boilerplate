import { Field, ObjectType } from '@nestjs/graphql';
import { Feedback } from './feedback.entity';

@ObjectType()
export class Project {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field(() => [Feedback], { nullable: true })
  feedback?: Feedback[];
}
