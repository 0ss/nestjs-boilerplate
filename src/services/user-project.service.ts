import { Injectable, Logger } from '@nestjs/common';
import { UserProject } from 'src/entities/userproject.entity';
import { isValid } from 'src/utils/is-valid';
import { PrismaService } from './prisma.service';
@Injectable()
export class UserProjectService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly logger = new Logger(UserProjectService.name);


  async findAll(userId: string): Promise<UserProject[]> {
    if (!isValid(userId)) return [];
    return await this.prismaService.userProject.findMany({
      where: { userId },
      select: {
        project: true,
        role: true,
      },
    });
  }
}
