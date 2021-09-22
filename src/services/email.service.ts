import { ProjectPlan } from '.prisma/client';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  
  private readonly logger = new Logger(EmailService.name);

  async sendEmail(to:string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: 'salahandstuff@gmail.com', // list of receivers
        from: 'salahandstuff@gmail.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      });
    } catch (e: any) {
      this.logger.error(e);
    }
  }

  async sendResetPasswordEmail(to:string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to, // list of receivers
        from: 'salahandstuff@gmail.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      });
    } catch (e: any) {
      this.logger.error(e);
    }
  }
}
 