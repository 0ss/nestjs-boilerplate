import { Controller, Get, HttpCode, Logger } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);

  @Get()
  welcomeApi(): string {
    return this.appService.welcomeApi();
  }

  @Get('/teapot')
  @HttpCode(418)
  teapot(): string {
    return this.appService.teapot();
  }
}
