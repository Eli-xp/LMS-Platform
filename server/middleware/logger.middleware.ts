import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import {UAParser} from 'ua-parser-js'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger  = new Logger('HTTP');
  use(req: Request, res: Response, next: () => void) {
    const {ip, method, baseUrl} = req;
    const parser = new UAParser(req.get('user-agent') || '');
    const browser = parser.getBrowser().name || 'Unknown';
    const os = parser.getOS().name || 'Unknown'
    const startAt = process.hrtime();
    // res.on('finish) for when the request is finished
    res.on('finish', () => {
      const {statusCode} = res;
      const contentLength = res.get('content-length');
      const dif = process.hrtime(startAt);
      const responseTime = dif[0] * 1e3 + dif[1] / 1e6;
      this.logger.log(
        `${ip} - ${os} - ${browser} - ${method} - ${baseUrl} - ${statusCode} - ${contentLength} - ${responseTime.toFixed(2)}ms`,
      )
    })
    
    next();
  }
}
