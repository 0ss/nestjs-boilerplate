import { forwardRef, Module } from '@nestjs/common';
import { UserResolver } from '../resolvers/user.resolver';
import { UserService } from '../services/user.service';
import { AuthModule } from './auth.module';
import { EmailModule } from './email.module';
import { UserProjectModule } from './user-project.module';

@Module({
  imports: [EmailModule, UserProjectModule, forwardRef(() => AuthModule)],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
