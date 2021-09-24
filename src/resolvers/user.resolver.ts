import { Logger, UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../decorators/currentuser.decorator';
import { User } from '../entities/user.entity';
import { UserProject } from '../entities/userproject.entity';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { UserService } from '../services/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  private readonly logger = new Logger(UserResolver.name);

  @UseGuards(AuthenticationGuard)
  @Query(() => User, { nullable: true })
  async user(@CurrentUser() user: User): Promise<User | null> {
    return await this.userService.findOneById(user?.id);
  }

  @ResolveField(() => [UserProject])
  async userProject(@Parent() user: User): Promise<UserProject[]> {
    return await this.userService.findAllProject(user.id);
  }
}
