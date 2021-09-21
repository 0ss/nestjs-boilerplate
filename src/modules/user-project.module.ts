/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UserProjectService } from '../services/user-project.service';

@Module({
  providers: [UserProjectService],
  exports: [UserProjectService],
})
export class UserProjectModule {}
