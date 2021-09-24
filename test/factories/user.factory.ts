import * as faker from 'faker';
import { Factory } from 'fishery';
import { LoginUserInput } from 'src/dto/login-user.input';
import { RegisterUserInput } from 'src/dto/register-user.input';
import { User } from 'src/entities/user.entity';
import { RegisterSocialInput } from '../../src/dto/register-social.input';
import { ResetPasswordToken } from '../../src/entities/reset-password-token.entity';
import { UserProject } from '../../src/entities/userproject.entity';
import { random } from '../../src/utils/random';
import { tomorrow } from '../../src/utils/tomorrow';
import { projectFactory } from './project.factory';


export const loginUserInputFactory = Factory.define<LoginUserInput>(() => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
}));
export const registerUserInputFactory = Factory.define<RegisterUserInput>(
  () => ({
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }),
);

export const registerSocialInputFactory = Factory.define<RegisterSocialInput>(
  () => ({
    socialId: faker.datatype.number().toString(),
    socialProvider: random(['github', 'google']),
    name: faker.name.firstName(),
    email: faker.internet.email(),
  }),
);

export const resetPasswordTokenFactory = Factory.define<ResetPasswordToken>(() => ({
  id: faker.datatype.uuid(),
  userId:faker.datatype.uuid(),
  token: faker.datatype.uuid(),
  expirationDate: tomorrow(),
  consumed:false,
  expired:false,

}))
export const userFactory = Factory.define<User>(() => ({
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  email: faker.internet.email(),
  createdAt: new Date()!,
  password: faker.internet.password(),
  socialId: faker.datatype.number().toString(),
  socialProvider: 'google',
}));

export const userProjectFactory = Factory.define<UserProject>(() => ({
  project: projectFactory.build(),
  role: random(['user', 'admin']),

}));

