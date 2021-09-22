import { Logger, UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../decorators/currentuser.decorator';
import { User } from '../entities/user.entity';
import { UserProject } from '../entities/userproject.entity';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { UserProjectService } from '../services/user-project.service';
import { UserService } from '../services/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly userProjectService: UserProjectService,
  ) {}

  private readonly logger = new Logger(UserResolver.name);

  @UseGuards(AuthenticationGuard)
  @Query(() => User, { nullable: true })
  async user(@CurrentUser() user: User): Promise<User | null> {
    console.log(user);
    return await this.userService.findOneById(user?.id);
  }

  @ResolveField(() => [UserProject])
  async userProject(@Parent() user: User): Promise<UserProject[]> {
    return await this.userProjectService.findAll(user.id);
  }
}
