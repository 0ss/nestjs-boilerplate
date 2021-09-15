
import * as faker from 'faker'
import { Factory } from 'fishery'
import { LoginUserInput } from 'src/dto/login-user.input'
import { RegisterUserInput } from 'src/dto/register-user.input'
import { User } from 'src/entities/user.entity'


export const loginUserInputFactory = Factory.define<LoginUserInput>(() => ({
    email : faker.internet.email(),
    password: faker.internet.password(),
}))
export const registerUserInputFactory = Factory.define<RegisterUserInput>(() => ({
    name: faker.name.firstName(),
    email : faker.internet.email(),
    password: faker.internet.password(),
}))
export const userFactory = Factory.define<User>(()=> ({
    id: faker.datatype.uuid(),
    socialId: null,
    socialProvider: null,
    name: faker.name.firstName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    createdAt: faker.date.past(),

}))
 