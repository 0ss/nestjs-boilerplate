import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProjectService } from '../services/project.service';
import { CreateProjectInput } from '../dto/create-project.input';
import { Project } from '../entities/project.entity';
import { CurrentUser } from '../decorators/currentuser.decorator';
import { User } from '../entities/user.entity';
import {
  Logger,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ProjectMember } from '../entities/projectmember.entity';
import { AddProjectMemberInput } from '../dto/add-project-member.input';
import { UserInputError } from 'apollo-server-express';
import { UserService } from '../services/user.service';
import { AuthenticationGuard } from '../guards/authentication.guard';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}
  private readonly logger = new Logger(ProjectResolver.name);

  @UseGuards(AuthenticationGuard)
  @Query(() => Project, { nullable: true })
  async project(
    @CurrentUser() user: User,
    @Args('id') id: string,
  ): Promise<Project> {
    const project = await this.projectService.findOne(id);

    if (!project)
      throw new NotFoundException(`Project with this id doesn't exist`);

    if (!(await this.userService.hasProjectWithId(user?.id, id)))
      throw new UnauthorizedException('You are not part of this project');

    return project;
  }

  @ResolveField(() => [ProjectMember])
  async projectMember(@Parent() project: Project): Promise<ProjectMember[]> {
    return await this.projectService.findMembers(project.id);
  }

  @UseGuards(AuthenticationGuard)
  @Mutation(() => Project)
  async createProject(
    @CurrentUser() user: User,
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ): Promise<Project> {
    return await this.projectService.create(createProjectInput, user.id);
  }

  @UseGuards(AuthenticationGuard)
  @Mutation(() => Project)
  async addProjectMember(
    @CurrentUser() user: User,
    @Args('addProjectMember')
    addProjectMemberInput: AddProjectMemberInput,
  ): Promise<ProjectMember[]> {
    const project = await this.projectService.findOne(
      addProjectMemberInput.projectId,
    );

    if (!project)
      throw new NotFoundException(`Project with this id doesn't exist`);

    if (
      !(await this.userService?.adminOfProjectWithId(
        user?.id,
        addProjectMemberInput.projectId,
      ))
    )
      throw new UnauthorizedException('Only project admins can remove users');

    const userExist = await this.userService.findOneByEmail(
      addProjectMemberInput.memeberEmail,
    );
    if (!userExist)
      throw new UserInputError("The user doesn't have an account !🙆");

    return await this.projectService.addMember(addProjectMemberInput, user.id);
  }
}
