import { registerEnumType } from '@nestjs/graphql';

export enum UserProjectRole {
  admin = 'admin',
  user = 'user',
}
registerEnumType(UserProjectRole, {
  name: 'UserProjectRole',
  description: 'the role of the user on a project',
});
