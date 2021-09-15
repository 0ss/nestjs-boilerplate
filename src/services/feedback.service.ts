import { Injectable } from '@nestjs/common';
import { CreateFeedbackInput } from 'src/dto/create-feedback.input';
import { FeedbackArgs } from 'src/dto/feedback.args';
import { UpdateFeedbackInput } from 'src/dto/update-feedback.input';
import { Feedback } from 'src/entities/feedback.entity';
import { Project } from 'src/entities/project.entity';
import { Source } from 'src/entities/source.entity';
import { ReqSource } from 'src/interfaces/req-source.interface';
import { isValid } from 'src/utils/is-valid';
import { PrismaService } from './prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private prismaService: PrismaService) {}

  async findAll(feedbackArgs: FeedbackArgs): Promise<Feedback[]> {
    const { projectId, skip, take } = feedbackArgs;
    if(!isValid(projectId)) return []
    return await this.prismaService.feedback.findMany({
      where: { projectId },
      skip,
      take,
    });
  }

  async create(createFeedbackInput: CreateFeedbackInput, reqSource : ReqSource): Promise<Boolean> {
    const feedback = await this.prismaService.source.create({
      data: {
        ...reqSource,
        feedback :{
          create :{
            ...createFeedbackInput
          }
        }
      },
    });
    return !!feedback;
  }
  async findSource(id: string): Promise<Source> {
    if(!isValid(id)) return null
    this.findAll;
    return await this.prismaService.feedback
      .findFirst({
        where: { id },
      })
      .source();
  }

  async findProject(id: string): Promise<Project> {
    return await this.prismaService.feedback
      .findFirst({
        where: { id },
      })
      .project();
  }

  async update(updateFeedbackInput: UpdateFeedbackInput): Promise<Feedback> {
    const { id, archived } = updateFeedbackInput;
    if(!isValid(id)) return null
    return await this.prismaService.feedback.update({
      where: { id },
      data: { archived },
    });
  }
}
