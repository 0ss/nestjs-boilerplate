import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProjectService } from 'src/services/project.service';
import { CreateProjectInput } from 'src/dto/create-project.input';
import { Project } from 'src/entities/project.entity';
import { CurrentUser } from 'src/decorators/currentuser.decorator';
import { User } from 'src/entities/user.entity';
import {
  Logger,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserFromRequest } from 'src/interfaces/user-from-request.interface';
import { ProjectMember } from 'src/entities/projectmember.entity';
import { AddProjectMemberInput } from 'src/dto/add-project-member.input';
import { UserInputError } from 'apollo-server-express';
import { UserService } from 'src/services/user.service';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}
  private readonly logger = new Logger(ProjectResolver.name);

  @Query(() => Project, { nullable: true })
  async project(@CurrentUser() user: UserFromRequest, @Args('id') id: string) : Promise<Project> {
    const project = await this.projectService.findOne(id);

    if (!project)
      throw new NotFoundException(`Project with this id doesn't exist`);

    if (!user?.hasProjectWithId(id))
      throw new UnauthorizedException('You are not part of this project');

    return project;
  }

  @ResolveField(() => [ProjectMember])
  async projectMember(@Parent() project: Project) : Promise<ProjectMember[]> {
    return await this.projectService.findMembers(project.id);
  }

  @Mutation(() => Project)
  async createProject(
    @CurrentUser() user: User,
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ) : Promise<Project> {
    return await this.projectService.create(createProjectInput, user.id);
  }

  @Mutation(() => Project)
  async addProjectMember(
    @CurrentUser() user: UserFromRequest,
    @Args('addProjectMember')
    addProjectMemberInput: AddProjectMemberInput,
  ) : Promise<Project> {
    const project = await this.projectService.findOne(
      addProjectMemberInput.projectId,
    );

    if (!project)
      throw new NotFoundException(`Project with this id doesn't exist`);

    if (!user?.adminOfProjectWithId(addProjectMemberInput.projectId))
      throw new UnauthorizedException('Only project admins can remove users');

    const userExist = await this.userService.findOneByEmail(
      addProjectMemberInput.memeberEmail,
    );
    if (!userExist)
      throw new UserInputError("The user doesn't have an account !🙆");

    return await this.projectService.addMember(addProjectMemberInput, user.id);
  }
}
