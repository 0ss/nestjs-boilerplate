import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class ResetPasswordToken {
  @Field(() => String)
  id: string;

  @Field(() => String)
  userI!: string;

  @Field(() => String)
  token: string;

  @Field(() => Boolean)
  consumed: boolean | null;

  @Field(() => Boolean)
  expired: boolean | null;

  @Field(() => Date)
  expirationDate: Date | null;

  @Field(() => User, { nullable: false })
  user?: User;
}
