import { Injectable } from '@nestjs/common';
import { Smsir } from 'sms-typescript';
import config from 'config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SmsService {
  // private readonly sms: Smsir;
  constructor(private readonly httpService: HttpService) {
    // this.sms = new Smsir(
    //   config.get<string>('server.sms.SMS_API_KEY'),
    //   config.get<number>('server.sms.SMS_NUMBER'),
    // );
  }
  async sendOpt(phone: string, code: string) {
    // return this.sms.sendBulk(`کد ورود شما: ${code}`, [phone]);
    return firstValueFrom(
      this.httpService.post(
        "https://api.sms.ir/v1/send/verify",
        {
          Mobile: phone,
          TemplateId: 100000,
          Parameters: 
          [
            {
              Name:'CODE',
              Value: code
            }
          ]
        },
        {
          headers: {
            'x-api-key': config.get<string>('server.sms.SMS_API_KEY'),
            'Content-Type': 'application/json',
          }
        }
      )
    )
  }
}
