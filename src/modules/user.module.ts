import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { UserResolver } from '../resolvers/user.resolver';
import { UserService } from '../services/user.service';
import { AuthModule } from './auth.module';
import { EmailModule } from './email.module';
import { UserProjectModule } from './user-project.module';

@Module({
  imports: [MailerModule, EmailModule, AuthModule, UserProjectModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
