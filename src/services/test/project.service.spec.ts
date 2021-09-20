import { Test, TestingModule } from '@nestjs/testing';
import {
  createProjectInputFactory,
  projectFactory,
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
});
