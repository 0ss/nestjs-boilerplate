import 'reflect-metadata';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserProjectRole } from '../enums/userproject-role.enum';
import { User } from './user.entity';

@ObjectType()
export class ProjectMember {
  @Field(() => UserProjectRole)
  role: 'admin' | 'user';

  @Field()
  user: User;
}
