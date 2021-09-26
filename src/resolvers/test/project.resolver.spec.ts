import { Test, TestingModule } from '@nestjs/testing';
import {
  createProjectInputFactory,
  projectFactory,
} from '../../../test/factories/project.factory';
import { userFactory } from '../../../test/factories/user.factory';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { ProjectResolver } from '../project.resolver';
import { UserResolver } from '../user.resolver';

describe('ProjectResolver', () => {
  let projectResolver: ProjectResolver;
  // let userResolver: UserResolver;
  // let userService: UserService;
  let projectService: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectResolver, ProjectService],
    }).compile();

    projectResolver = module.get<ProjectResolver>(ProjectResolver);
    projectService = module.get<ProjectService>(ProjectService);

    // userResolver = module.get<UserResolver>(UserResolver);
    // userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(projectResolver).toBeDefined();
  });
  describe('project', () => {
    it('should return project', async () => {
      const user = userFactory.build();
      const project = projectFactory.build();
      jest.spyOn(projectService,'findOne').mockResolvedValueOnce(project);
      const result = projectResolver.project(user,project.id)
      expect(result).toBe(project)
    });
    // it('should return null when id does not exist', async () => {
    //   const user = userFactory.build();
    //   jest.spyOn(userService, 'findOneById').mockResolvedValueOnce(null);
    //   const result = await userResolver.user(null);
    //   expect(result).toBeNull();
    // });
  });
});
