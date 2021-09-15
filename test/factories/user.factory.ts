
import * as faker from 'faker'
import { Factory } from 'fishery'
import { LoginUserInput } from 'src/dto/login-user.input'
import { RegisterUserInput } from 'src/dto/register-user.input'
import { User } from 'src/entities/user.entity'


export const loginUserInputFactory = 1
export const registerUserInputFactory = 1
export const userFactory = Factory.define<User>(()=> ({
    id: faker.datatype.uuid(),
    socialId: null,
    socialProvider: null,
    name: faker.name.firstName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    createdAt: faker.date.past(),

}))
/**
 * 
 * @Field()
  id: string;

  @Field({ nullable: true })
  socialId?: string;

  @Field(() => SocialProvider, { nullable: true })
  socialProvider?: 'google' | 'github';

  @Field()
  name: string;

  password: string; // its not a graphql field cuz we dont wanna expose it.

  @Field()
  email: string;

  @Field()
  createdAt: Date;

  @Field(() => [UserProject])
  userProject?: UserProject[];
 */