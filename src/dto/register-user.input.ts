import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class RegisterUserInput {
  @Field()
  @MinLength(1)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(5)
  password: string;
}
