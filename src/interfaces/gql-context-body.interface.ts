import { Request } from 'express';
import { User } from '../entities/user.entity';

export interface GqlContextBody {
  user: User;
  req: Request;
}
