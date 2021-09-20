import { Injectable } from '@nestjs/common';
import { AddProjectMemberInput } from '../dto/add-project-member.input';
import { Project } from '../entities/project.entity';
import { ProjectMember } from 'src/entities/projectmember.entity';
import { isValid } from '../utils/is-valid';
import { v4 as uuid } from 'uuid';
import { CreateProjectInput } from '../dto/create-project.input';
import { PrismaService } from './prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createProjectInput: CreateProjectInput,
    userId: string,
  ): Promise<Project> {

    return await this.prismaService.project.create({
      data: {
        id: uuid(),
        name: createProjectInput.name,
        userProject: {
          create: {
            userId,
            role: 'admin',
          },
        },
      },
    });
  }

  async addMember(
    addProjectMemberInput: AddProjectMemberInput,
    userId: string,
  ): Promise<ProjectMember[]> {
    await this.prismaService.userProject.create({
      data: {
        projectId: addProjectMemberInput.projectId,
        userId: userId,
        role: addProjectMemberInput.role,
      },
      select :{
        user:true,
        role:true,
      }
    })
    return await this.prismaService.userProject.findMany({
      where: { projectId: addProjectMemberInput.projectId  },
      select: {
        user: true,
        role: true,
      },
    })
  }

  async findMembers(projectId: string): Promise<ProjectMember[]> {
    if (!isValid(projectId)) return [];
    return await this.prismaService.userProject.findMany({
      where: { projectId },
      select: {
        user: true,
        role: true,
      },
    });
  }

  async findOne(id: string): Promise<Project | null> {
    if (!isValid(id)) return null;
    return (await this.prismaService.project.findFirst({ where: { id } }))
  }
}
