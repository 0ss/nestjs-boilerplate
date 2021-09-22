import 'reflect-metadata';
import { registerEnumType } from '@nestjs/graphql';

export enum SocialProvider {
  google = 'google',
  githbu = 'github',
}
registerEnumType(SocialProvider, {
  name: 'SocialProvider',
});
