import { registerEnumType, Field } from "@nestjs/graphql";


export enum FeedbackEmoji {
  veryhappy = "veryhappy",
  happy= "happy",
  neutral = "neutral",
  sad = "sad",
  verysad = "verysad"
}
registerEnumType(FeedbackEmoji, {
  name: "FeedbackEmoji",
  description: "The text identifers that refer to emojies",
});