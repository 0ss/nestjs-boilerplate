import { forwardRef, Module } from '@nestjs/common';
import { ProjectService } from '../services/project.service';
import { ProjectResolver } from '../resolvers/project.resolver';
import { UserModule } from './user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [ProjectResolver, ProjectService],
  exports: [ProjectService]
})
export class ProjectModule {}
