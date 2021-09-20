import { Test, TestingModule } from '@nestjs/testing';
import {
  addProjectMemberInputFactory,
  createProjectInputFactory,
  projectFactory,
  projectMemberFactory,
} from '../../../test/factories/project.factory';
import { userFactory } from '../../../test/factories/user.factory';
import { PrismaModule } from '../../modules/prisma.module';
import { PrismaService } from '../prisma.service';
import { ProjectService } from '../project.service';

describe('ProjectService', () => {
  let projectService: ProjectService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ProjectService],
    }).compile();

    projectService = module.get<ProjectService>(ProjectService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(projectService).toBeDefined();
  });

  describe('create', () => {
    it('should create new project', async () => {
      const createProjectInput = createProjectInputFactory.build();
      const user = userFactory.build();
      const project = projectFactory.build(createProjectInput);
      jest
        .spyOn(prismaService.project, 'create')
        .mockResolvedValueOnce(project);
      const result = await projectService.create(createProjectInput, user.id);
      expect(result).toEqual(project);
    });
  });

  describe('findOne', () => {
    it('should find project', async () => {
      const project = projectFactory.build();
      jest
        .spyOn(prismaService.project, 'findFirst')
        .mockResolvedValueOnce(project);
      const result = await projectService.findOne(project.id);
      expect(result).toEqual(project);
    });
    it('should return null when project id is not valid', async () => {
      const invalid = await projectService.findOne(undefined);
      expect(invalid).toBeNull();
    });
  });

  describe('findMembers', () => {
    it('should return empty array when project id is not valid', async () => {
      const invalid = await projectService.findMembers(undefined);
      expect(invalid).toHaveLength(0)
    });

    it('should find project members', async () => {
      const user = userFactory.build();
      const project = projectFactory.build();
      const projectMember = projectMemberFactory.build({user});

      jest.spyOn(prismaService.userProject, 'findMany').mockResolvedValueOnce([
        {
          projectId: project.id,
          role: projectMember.role,
          userId: projectMember.user.id,
        },
      ]);

      const result = await projectService.findMembers(project.id);

      expect(result).toEqual([
        {
          projectId: project.id,
          role: projectMember.role,
          userId: projectMember.user.id,
        },
      ]);
    });
  });

  describe('addMember', () => {
    it('should add new member', async () => {
      const addProjectMemberInput = addProjectMemberInputFactory.build(); // build input coming from user

      const user = userFactory.build({
        // making user with same email from the input
        email: addProjectMemberInput.memeberEmail,
      });
      const projectMember = projectMemberFactory.build({
        // making project member template from the user
        user,
        role: addProjectMemberInput.role,
      });

      jest.spyOn(prismaService.userProject, 'create').mockResolvedValueOnce({
        projectId: addProjectMemberInput.projectId,
        role: projectMember.role,
        userId: projectMember.user.id,
      });

      jest.spyOn(prismaService.userProject, 'findMany').mockResolvedValueOnce([
        {
          projectId: addProjectMemberInput.projectId,
          role: projectMember.role,
          userId: projectMember.user.id,
        },
      ]);

      const result = await projectService.addMember(
        addProjectMemberInput,
        user.id,
      );
      expect(result).toEqual([
        {
          projectId: addProjectMemberInput.projectId,
          role: projectMember.role,
          userId: projectMember.user.id,
        },
      ]);
    });
  });
});
