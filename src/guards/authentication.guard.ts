import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { jwt } from '../utils/jwt';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor() {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = this.getRequest(context);
    try {
      const token = req.headers.authorization?.replace('Bearer', '')?.trim();
      const user: Partial<User> = await jwt.verify(token);
      req.user = user;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token, login please');
    }
  }
}
