import { Injectable, Logger } from '@nestjs/common';
import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { RegisterSocialInput } from '../dto/register-social.input';
import { RegisterUserInput } from '../dto/register-user.input';
import { User } from '../entities/user.entity';
import { isValid } from '../utils/is-valid';
import { PrismaService } from './prisma.service';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {
    // prismaService.$on<any>('query', (event: Prisma.QueryEvent) => {
    //   console.log('Query: ' + event.query);
    //   console.log('Duration: ' + event.duration + 'ms');
    // });
  }
  private readonly logger = new Logger(UserService.name);
  async create(registerUserInput: RegisterUserInput): Promise<User | null> {
    const { email, name, password } = registerUserInput;
    const hashedPassword = await hash(password, 10);
    return await this.prismaService.user.create({
      data: {
        id: uuid(),
        email,
        name,
        password: hashedPassword,
      },
    });
  }

  async createWithSocial(
    registerSocialInput: RegisterSocialInput,
  ): Promise<User | null> {
    return await this.prismaService.user.create({
      data: {
        id: uuid(),
        ...registerSocialInput,
      },
    });
  }

  async findOneById(id: string): Promise<User | null> {
    if (!isValid(id)) return null;
    return await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });
  }

  async findOneBySocialId(socialId: string): Promise<User | null> {
    if (!isValid(socialId)) return null;
    return await this.prismaService.user.findFirst({
      where: {
        socialId,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    if (!isValid(email)) return null;
    return await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }
}
