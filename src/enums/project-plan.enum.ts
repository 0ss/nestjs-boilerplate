import { registerEnumType } from '@nestjs/graphql';

export enum ProjectPlan {
    free = "free",
    pro = "pro",
    business = "business"
}

registerEnumType(ProjectPlan, { name: 'ProjectPlan' })
