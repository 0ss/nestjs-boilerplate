import { ObjectType, Field, Int } from '@nestjs/graphql';
import { FeedbackEmoji } from 'src/enums/feedback-emoji.enum';
import { FeedbackType } from 'src/enums/feedback-type.enum';
import { Project } from './project.entity';
import { Source } from './source.entity';


 
@ObjectType()
export class Feedback {
  
  @Field()
  id: string;

  @Field(() => Project , { nullable: true })
  project?: Project;

  @Field(() => FeedbackType)
  type: "issue" | "idea" | "other";;

  @Field(() => FeedbackEmoji , { nullable: true })
  emoji: "veryhappy" | "happy" | "neutral" | "sad" | "verysad" | null
  
  @Field()
  content: string;

  @Field()
  page: string ;

  @Field()
  metadata: string;

  @Field()
  archived: boolean;

  @Field()
  createdAt: Date;

  @Field(() => Source, { nullable : true})
  source?: Source;
 
}