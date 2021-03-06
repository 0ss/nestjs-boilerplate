import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule, {});
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ credentials: true, origin: configService.get('CORS_URL') });
  app.use(compression());

  await app.listen(configService.get('PORT'));
}
bootstrap();
