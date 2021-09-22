/*
https://docs.nestjs.com/middleware#middleware
*/

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(HttpLoggerMiddleware.name);

  use(req: Request, res: Response, next: Function) {
    const { ip, method, originalUrl: url } = req;
    const hostname = require('os').hostname();
    const userAgent = req.get('user-agent') || '';
    const referer = req.get('referer') || '';
    res.on('close', () => {
      const { statusCode, statusMessage } = res;
      const contentLength = res.get('content-length');
      this.logger.log(`${method} ${url} ${statusCode}`);
    });

    next();
  }
}
