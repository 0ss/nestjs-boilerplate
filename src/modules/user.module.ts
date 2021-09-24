import { forwardRef, Module } from '@nestjs/common';
import { UserResolver } from '../resolvers/user.resolver';
import { UserService } from '../services/user.service';
import { AuthModule } from './auth.module';
import { EmailModule } from './email.module';

@Module({
  imports: [],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
