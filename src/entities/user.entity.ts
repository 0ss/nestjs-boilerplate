import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { SocialProvider } from '../enums/social-provider.enum';
import { UserProject } from './userproject.entity';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field({ nullable: true })
  socialId: string | null;

  @Field(() => SocialProvider, { nullable: true })
  socialProvider: 'google' | 'github' | null;

  @Field()
  name: string;

  password: string; // its not a graphql field cuz we dont wanna expose it.

  @Field()
  email: string;

  @Field()
  createdAt: Date;

  @Field(() => [UserProject])
  userProject?: UserProject[];

  //sa : () => void
}
