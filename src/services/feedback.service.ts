import { Injectable } from '@nestjs/common';
import { CreateFeedbackInput } from '../dto/create-feedback.input';
import { FeedbackArgs } from '../dto/feedback.args';
import { UpdateFeedbackInput } from '../dto/update-feedback.input';
import { Feedback } from '../entities/feedback.entity';
import { Project } from '../entities/project.entity';
import { Source } from '../entities/source.entity';
import { ReqSource } from '../interfaces/req-source.interface';
import { isValid } from '../utils/is-valid';
import { PrismaService } from './prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private prismaService: PrismaService) {}

  async findAll(projectId: string): Promise<Feedback[]> {
    if (!isValid(projectId)) return [];
    return await this.prismaService.feedback.findMany({
      where: { projectId },
    });
  }

  async create(
    createFeedbackInput: CreateFeedbackInput,
    reqSource: ReqSource,
  ): Promise<Boolean> {
    await this.prismaService.source.create({
      data: {
        ...reqSource,
        feedback: {
          create: {
            ...createFeedbackInput,
          },
        },
      },
    });
    return true;
  }
  async findSource(feedbackId: string): Promise<Source> {
    if (!isValid(feedbackId)) return null;
    this.findAll;
    return await this.prismaService.feedback.findFirst({
      where: {
        id :feedbackId
      }
    }).source()
  }

  async findProject(feedbackId: string): Promise<Project> {
    return await this.prismaService.feedback
      .findFirst({
        where: { id : feedbackId },
      })
      .project();
  }


  async update(updateFeedbackInput: UpdateFeedbackInput): Promise<Feedback> {
    const { id, archived } = updateFeedbackInput;
    if (!isValid(id)) return null;
    return await this.prismaService.feedback.update({
      where: { id },
      data: { archived },
    });
  }
}
