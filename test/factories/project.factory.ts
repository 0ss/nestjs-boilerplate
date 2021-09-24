import * as faker from 'faker';
import { Factory } from 'fishery';
import { AddProjectMemberInput } from '../../src/dto/add-project-member.input';
import { CreateProjectInput } from '../../src/dto/create-project.input';
import { RegisterSocialInput } from '../../src/dto/register-social.input';
import { Project } from '../../src/entities/project.entity';
import { ProjectMember } from '../../src/entities/projectmember.entity';
import { random } from '../../src/utils/random';
import { userFactory } from './user.factory';

export const addProjectMemberInputFactory =
  Factory.define<AddProjectMemberInput>(() => ({
    memeberEmail: faker.internet.email(),
    projectId: faker.datatype.uuid(),
    role: random(['user', 'admin']),
  }));
export const createProjectInputFactory = Factory.define<CreateProjectInput>(
  () => ({
    name: faker.name.firstName(),
  }),
);

export const registerSocialInputFactory = Factory.define<RegisterSocialInput>(
  () => ({
    socialId: faker.datatype.number().toString(),
    socialProvider: random(['gitub', 'google']),
    name: faker.name.firstName(),
    email: faker.internet.email(),
  }),
);

export const projectFactory = Factory.define<Project>(() => ({
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  isPaying: random([true, false]),
  plan: random(['free', 'pro', 'business']),
  createdAt: new Date(),
}));


export const projectMemberFactory = Factory.define<ProjectMember>(() => ({
  user: userFactory.build(),
  role: random(['user', 'admin']),
}));
