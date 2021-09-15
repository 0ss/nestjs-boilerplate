import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class RegisterSocialInput {
  @Field()
  socialProvider: "google" | "github"

  @Field()
  socialId: string

  @Field()
  @IsEmail()
  email: string;

  @Field()
  name: string; 
}
