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
  plan: 'free' | 'pro' | 'business';

  @Field(() => String)
  isPaying: boolean;

}
