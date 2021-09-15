import { Logger, UseGuards } from '@nestjs/common';
import {
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/currentuser.decorator';
import { User } from 'src/entities/user.entity';
import { UserProject } from 'src/entities/userproject.entity';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { UserProjectService } from 'src/services/user-project.service';
import { UserService } from 'src/services/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly userProjectService: UserProjectService,
  ) {}

  private readonly logger = new Logger(UserResolver.name);

  @UseGuards(AuthenticationGuard)
  @Query(() => User, { nullable :true })
  async user(@CurrentUser() user: User): Promise<User | null> {
    console.log(user)
    return await this.userService.findOneById(user?.id);
  }

  
  @ResolveField(() => [UserProject])
  async userProject(@Parent() user: User): Promise<UserProject[]> {
    return await this.userProjectService.findAll(user.id);
  }
}
