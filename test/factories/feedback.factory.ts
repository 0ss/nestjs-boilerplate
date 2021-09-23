import { ResetPasswordToken } from '.prisma/client';
import * as faker from 'faker';
import { Factory } from 'fishery';
import { LoginUserInput } from 'src/dto/login-user.input';
import { RegisterUserInput } from 'src/dto/register-user.input';
import { User } from 'src/entities/user.entity';
import { CreateFeedbackInput } from '../../src/dto/create-feedback.input';
import { RegisterSocialInput } from '../../src/dto/register-social.input';
import { UpdateFeedbackInput } from '../../src/dto/update-feedback.input';
import { Feedback } from '../../src/entities/feedback.entity';
import { Source } from '../../src/entities/source.entity';
import { random } from '../../src/utils/random';
import { tomorrow } from '../../src/utils/tomorrow';
import { projectFactory } from './project.factory';

export const sourceFactory = Factory.define<Source>(() => ({
  id: faker.datatype.uuid(),
  browser: random(['Chrome', 'Edge', 'Firefox', 'Brave']),
  country: faker.address.country(),
  device: random(['smartphone', 'desktop']),
  os: random(['Linux', 'MacOS', 'Window']),
}));

const projectId = faker.datatype.uuid();
const sourceId = faker.datatype.uuid();
export const feedbackFactory = Factory.define<Feedback>(() => ({
  id: faker.datatype.uuid(),
  projectId,
  sourceId, 
  archived: faker.datatype.boolean(),
  content: faker.lorem.lines(3),
  createdAt: faker.datatype.datetime(),
  emoji: random(['veryhappy', 'happy', 'neutral', 'sad', 'verysad']),
  page: `/${faker.lorem.words(1)}`,
  type: random(['issue', 'idea', 'other']),
  project: projectFactory.build({id: projectId}),
  metadata: JSON.stringify({
    userId: faker.datatype.uuid(),
    email: faker.internet.email(),
  }),
  source: sourceFactory.build({id: sourceId}),
}));

export const createFeedbackInputFactory = Factory.define<CreateFeedbackInput>(
  () => ({
    projectId: faker.datatype.uuid(),
    content: faker.lorem.lines(3),
    metadata: JSON.stringify({
      userId: faker.datatype.uuid(),
      email: faker.internet.email(),
    }),
    page: `/${faker.lorem.words(1)}`,
    type: random(['issue', 'idea', 'other']),
    emoji: random(['veryhappy', 'happy', 'neutral', 'sad', 'verysad']),
  }),
);

export const updateFeedbackInputFactory = Factory.define<UpdateFeedbackInput>(
  () => ({
    id: faker.datatype.uuid(),
    archived: faker.datatype.boolean(),
  }),
);
