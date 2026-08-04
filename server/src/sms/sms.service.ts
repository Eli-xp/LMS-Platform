import { Injectable } from '@nestjs/common';
import { Smsir } from 'sms-typescript';
import config from 'config';

@Injectable()
export class SmsService {
  private readonly sms: Smsir;
  constructor() {
    this.sms = new Smsir(
      config.get<string>('server.sms.SMS_API_KEY'),
      config.get<number>('server.sms.SMS_NUMBER'),
    );
  }
  async sendOpt(phone: string, code: string) {
    return this.sms.sendBulk(`کد ورود شما: ${code}`, [phone]);
  }
}
