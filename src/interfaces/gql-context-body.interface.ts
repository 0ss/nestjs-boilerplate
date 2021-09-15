import { Request } from 'express';
import { User } from 'src/entities/user.entity';

export interface GqlContextBody {
  user: User;
  req: Request;
}
