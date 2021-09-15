/*
https://docs.nestjs.com/middleware#middleware
*/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserProjectService } from 'src/services/user-project.service';
import { User } from '../entities/user.entity';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly userProjectService: UserProjectService,

    private readonly authService: AuthService,
  ) {}
  async use(req: Request, res: Response, next: Function) {
    try {
      const token = req.headers.authorization?.replace('Bearer', '')?.trim();
      const user: Partial<User | null> = await this.authService.verifyToken(token);
      const userProject = await this.userProjectService.findAll(user?.id);
      req.user = {
        ...user,
        hasProjectWithId(projectId: string) {
          return userProject?.some((_) => _.project.id === projectId);
        },
        adminOfProjectWithId(projectId: string) {
          return (
            userProject?.filter((_) => _?.project.id === projectId)[0].role ===
            'admin'
          );
        },
      };
    } catch {
      req.user = null;
    }
    next();
  }
}
