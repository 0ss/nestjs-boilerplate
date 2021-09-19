
import * as faker from 'faker'
import { Factory } from 'fishery'
import { LoginUserInput } from 'src/dto/login-user.input'
import { RegisterUserInput } from 'src/dto/register-user.input'
import { User } from 'src/entities/user.entity'
import { RegisterSocialInput } from '../../src/dto/register-social.input'


export const loginUserInputFactory = Factory.define<LoginUserInput>(() => ({
    email : faker.internet.email(),
    password: faker.internet.password(),
}))
export const registerUserInputFactory = Factory.define<RegisterUserInput>(() => ({
    name: faker.name.firstName(),
    email : faker.internet.email(),
    password: faker.internet.password(),
}))
 
export const registerSocialInput = Factory.define<RegisterSocialInput>(() => ({
    socialId:faker.datatype.number().toString(),
    socialProvider:"google",
    name: faker.name.firstName(),
    email: faker.internet.email(),
}))
 

export const userFactory = Factory.define<User>(()=> ({
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    createdAt: new Date()!,
    password: faker.internet.password(),
    socialId:faker.datatype.number().toString(),
    socialProvider:"google"
}))
 