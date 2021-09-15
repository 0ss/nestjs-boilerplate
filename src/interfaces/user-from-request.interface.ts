import { User } from 'src/entities/user.entity';

export interface UserFromRequest extends Partial<User> {
  hasProjectWithId(project): Boolean;
  adminOfProjectWithId(projectId: string): Boolean;
}
