import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  createProjectInputFactory,
  projectFactory,
} from '../../../test/factories/project.factory';
import { userFactory } from '../../../test/factories/user.factory';
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
    // it('should throw error when project does not exist', async () => {
    //   const user = userFactory.build();
    //   const project = projectFactory.build();
    //   jest.spyOn(projectService, 'findOne').mockResolvedValueOnce(null);
    //   expect(async () => {
    //     const result =  await projectResolver.project(user, project.id);
    //     expect(result).rejects
    //   })
    // });
  });
});
