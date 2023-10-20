import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    private configService: ConfigService,
    @Inject('TASKS') private tasks: any[],
  ) {}
  getHello(): string {
    const apiKey = this.configService.get<string>('API_KEY');
    return `Hello World! ${apiKey}`;
  }
}
