import { Test, TestingModule } from '@nestjs/testing';
import { createProjectInputFactory, projectFactory } from '../../../test/factories/project.factory';
import { PrismaModule } from '../../modules/prisma.module';
import { PrismaService } from '../prisma.service';
import { ProjectService } from '../project.service';

describe('ProjectService', () => {
  let projectService: ProjectService;
  let prismaService : PrismaService
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
      // const createProjectInput  = createProjectInputFactory.build();
      // const project = projectFactory.build(createProjectInput).;
      // jest
      //   .spyOn(prismaService.project, 'create')
      //   .mockResolvedValueOnce()
      // const result = await projectService.create(createProjectInputFactory);
      // expect(result).toEqual(project);
    });
  });
});
