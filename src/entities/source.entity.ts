import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SourceDevice } from '../enums/source-device.enum';

@ObjectType()
export class Source {
    @Field()
    id: string;

    @Field(() => SourceDevice, { nullable:true })
    device: "smartphone" | "desktop" | null;
 
    @Field(() => String, { nullable:true })
    country: string | null
 
    @Field(() => String, { nullable:true })
    browser: string | null;

    @Field(() => String, { nullable:true })
    os: string | null;
}