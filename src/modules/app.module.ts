import { UserProjectModule } from './user-project.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlConfigService } from 'src/config/graphql.config';
import { HttpLoggerMiddleware } from 'src/middlewares/http-logger.middleware';
import { AppController } from '../controllers/app.controller';
import { GetUserMiddleware } from '../middlewares/get-user.middleware';
import { FeedbackModule } from '../modules/feedback.module';
import { UserModule } from '../modules/user.module';
import { AppService } from '../services/app.service';
import { AuthModule } from './auth.module';
import { EmailModule } from './email.module';
import { PrismaModule } from './prisma.module';
import { ProjectModule } from './project.module';
@Module({
  imports: [
    UserProjectModule,
    UserModule,
    PrismaModule,
    FeedbackModule,
    EmailModule,
    AuthModule,
    ProjectModule,
    GraphQLModule.forRootAsync({
      useClass: GraphqlConfigService,
    }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          service: configService.get('SMTP_SERVICE'),
          host: configService.get('SMTP_HOST'),
          secure: true,
          auth: {
            user: configService.get('SMTP_USERNAME'),
            pass: configService.get('SMTP_PASSWORD'),
          },
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
   // consumer.apply(GetUserMiddleware).forRoutes('/api/graphql');
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
