
import { Field, ObjectType } from '@nestjs/graphql';
import { UserProjectRole } from '../enums/userproject-role.enum';
import { Project } from './project.entity';

@ObjectType()
export class UserProject {

  @Field(() => UserProjectRole)
  role: "admin" | "user";

  @Field(() => Project)
  project: Project;

}
