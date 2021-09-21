import { Field, InputType } from "@nestjs/graphql";
import { UserProjectRole } from "../enums/userproject-role.enum";


@InputType()
export class AddProjectMemberInput {

  @Field()
  projectId: string

  @Field()
  memeberEmail: string;

  @Field(() => UserProjectRole)
  role: UserProjectRole;
}