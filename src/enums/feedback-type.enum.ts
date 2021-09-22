import 'reflect-metadata';
import { registerEnumType } from '@nestjs/graphql';

export enum FeedbackType {
  issue = 'issue',
  idea = 'idea',
  other = 'other',
}
registerEnumType(FeedbackType, {
  name: 'FeedbackType',
  description:
    "The feedback types, default is an issue cuz it's more convenient",
});
