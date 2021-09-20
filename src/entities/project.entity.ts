import { Field, ObjectType } from '@nestjs/graphql';
import { ProjectPlan } from '../enums/project-plan.enum';
import { Feedback } from './feedback.entity';

@ObjectType()
export class Project {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field(() => ProjectPlan)
  plan: ProjectPlan;

  @Field(() => String)
  isPaying: boolean;

  @Field(() => [Feedback], { nullable: true })
  feedback?: Feedback[];
}
