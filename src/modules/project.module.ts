import { Module } from '@nestjs/common';
import { ProjectService } from '../services/project.service';
import { ProjectResolver } from '../resolvers/project.resolver';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule],
  providers: [ProjectResolver, ProjectService],
})
export class ProjectModule {}
