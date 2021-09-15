import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { join } from 'path';

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      path: '/api/graphql',
      tracing: process.env.NODE_ENV === 'development',
      plugins: [],
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.extensions?.response?.message || error.message,
        };
        return graphQLFormattedError;
      },
      cors: { credentials: true, origin: process.env.CORS_URL },
      context: ({ req }) => {
        const user = req?.user;
        return {
          user,
        };
      },
    };
  }
}
