import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserInputError } from 'apollo-server-errors';
import { createFeedbackInputFactory } from '../../../test/factories/feedback.factory';
import {
  addProjectMemberInputFactory,
  createProjectInputFactory,
  projectFactory,
  projectMemberFactory,
} from '../../../test/factories/project.factory';
import { userFactory } from '../../../test/factories/user.factory';
import { ProjectMember } from '../../entities/projectmember.entity';
import { PrismaModule } from '../../modules/prisma.module';
import { UserModule } from '../../modules/user.module';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { ProjectResolver } from '../project.resolver';
import { UserResolver } from '../user.resolver';

describe('ProjectResolver', () => {
  let projectResolver: ProjectResolver;
  // let userResolver: UserResolver;
  let userService: UserService;
  let projectService: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, PrismaModule],
      providers: [ProjectResolver, ProjectService],
    }).compile();

    projectResolver = module.get<ProjectResolver>(ProjectResolver);
    projectService = module.get<ProjectService>(ProjectService);

    // userResolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(projectResolver).toBeDefined();
  });
  describe('project', () => {
    it('should return project when user has it', async () => {
      const user = userFactory.build();
      const project = projectFactory.build();
      jest.spyOn(projectService, 'findOne').mockResolvedValueOnce(project);
      jest.spyOn(userService, 'hasProjectWithId').mockResolvedValueOnce(true);
      const result = await projectResolver.project(user, project.id);
      expect(result).toBe(project);
    });
    it('should throw error when project does not exist', async () => {
      const user = userFactory.build();
      jest.spyOn(projectService, 'findOne').mockResolvedValueOnce(null);
      await expect(async () => {
        await projectResolver.project(user, undefined);
      }).rejects.toThrowError(NotFoundException);
    });
    it('should throw error when user does not have project', async () => {
      const user = userFactory.build();
      const project = projectFactory.build();
      jest.spyOn(projectService, 'findOne').mockResolvedValueOnce(project);
      jest.spyOn(userService, 'hasProjectWithId').mockResolvedValueOnce(false);
      await expect(async () => {
        await projectResolver.project(user, project.id);
      }).rejects.toThrow(UnauthorizedException);
    });
  });
  describe('projectMember', () => {
    it('should return project member', async () => {
      const project = projectFactory.build();
      const projectMember = projectMemberFactory.buildList(10);
      jest
        .spyOn(projectService, 'findMembers')
        .mockResolvedValueOnce(projectMember);
      const result = await projectResolver.projectMember(project);
      expect(result).toBe(projectMember);
    });
    it('should return empty array when no project member', async () => {
      const project = projectFactory.build();
      jest.spyOn(projectService, 'findMembers').mockResolvedValueOnce([]);
      const result = await projectResolver.projectMember(project);
      expect(result).toHaveLength(0);
    });
  });
  describe('createProject', () => {
    it('should create project', async () => {
      const user = userFactory.build();
      const project = projectFactory.build();
      const createProjectInput = createProjectInputFactory.build();
      jest.spyOn(projectService, 'create').mockResolvedValueOnce(project);
      const result = await projectResolver.createProject(
        user,
        createProjectInput,
      );
      expect(result).toBe(project);
    });
  });
  describe('addProjectMember', () => {
    it('should add user to project', async () => {
      const member = userFactory.build();
      const user = userFactory.build();
      const projectMember = projectMemberFactory.buildList(10, {
        user: member,
      });
      const project = projectFactory.build({});
      const addProjectMemberInput = addProjectMemberInputFactory.build({
        projectId: project.id,
        memeberEmail: member.email,
      });
      jest.spyOn(projectService, 'findOne').mockResolvedValueOnce(project);
      jest
        .spyOn(userService, 'adminOfProjectWithId')
        .mockResolvedValueOnce(true);
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValueOnce(user);
      jest
        .spyOn(projectService, 'addMember')
        .mockResolvedValueOnce(projectMember);

      const result = await projectResolver.addProjectMember(
        user,
        addProjectMemberInput,
      );
      expect(result).toBe(projectMember);
    });
    it('should throw error when project does not exist', async () => {
      const member = userFactory.build();
      const user = userFactory.build();
      const project = projectFactory.build({});
      const addProjectMemberInput = addProjectMemberInputFactory.build({
        projectId: project.id,
        memeberEmail: member.email,
      });
      jest.spyOn(projectService, 'findOne').mockResolvedValueOnce(null);
      await expect(async () => {
        await projectResolver.addProjectMember(user, addProjectMemberInput);
      }).rejects.toThrowError(NotFoundException);
    });
    it('should throw error when non admin user try add member', async () => {
      const member = userFactory.build();
      const user = userFactory.build();
      const project = projectFactory.build({});
      const addProjectMemberInput = addProjectMemberInputFactory.build({
        projectId: project.id,
        memeberEmail: member.email,
      });
      jest.spyOn(projectService, 'findOne').mockResolvedValueOnce(project);
      jest
        .spyOn(userService, 'adminOfProjectWithId')
        .mockResolvedValueOnce(false);
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValueOnce(null);

      await expect(async () => {
        await projectResolver.addProjectMember(user, addProjectMemberInput);
      }).rejects.toThrowError(UnauthorizedException);
    });
    it('should throw error when member does not have an account', async () => {
      const member = userFactory.build();
      const user = userFactory.build();
      const project = projectFactory.build({});
      const addProjectMemberInput = addProjectMemberInputFactory.build({
        projectId: project.id,
        memeberEmail: member.email,
      });
      jest.spyOn(projectService, 'findOne').mockResolvedValueOnce(project);
      jest
        .spyOn(userService, 'adminOfProjectWithId')
        .mockResolvedValueOnce(true);

      await expect(async () => {
        await projectResolver.addProjectMember(user, addProjectMemberInput);
      }).rejects.toThrowError(UserInputError);
    });
  });
});
